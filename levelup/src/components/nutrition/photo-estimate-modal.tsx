import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { PillButton } from '@/components/ui/pill-button';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { estimateFromImage } from '@/lib/nutrition-ai';
import type { LoggedMeal, MealSlot } from '@/lib/types';
import { useApp } from '@/state/app-context';

import { CaptureModalShell } from './capture-modal-shell';
import { EstimateResult, type MealEstimate } from './estimate-result';

type Step = 'idle' | 'estimating' | 'result' | 'error';

export function PhotoEstimateModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useApp();
  const [step, setStep] = useState<Step>('idle');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<MealEstimate | null>(null);
  const [error, setError] = useState('');

  const reset = useCallback(() => {
    setStep('idle');
    setPhotoUri(null);
    setEstimate(null);
    setError('');
  }, []);

  const close = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handlePicked = async (result: ImagePicker.ImagePickerResult) => {
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];
    if (!asset.base64) {
      setError('Could not read the photo. Try again.');
      setStep('error');
      return;
    }
    setPhotoUri(asset.uri);
    setStep('estimating');
    try {
      const mediaType = asset.mimeType ?? 'image/jpeg';
      const result2 = await estimateFromImage(asset.base64, mediaType);
      setEstimate(result2);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Estimate failed.');
      setStep('error');
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      setError('Camera permission was denied.');
      setStep('error');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.5, base64: true });
    handlePicked(result);
  };

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      setError('Photo library permission was denied.');
      setStep('error');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.5, base64: true });
    handlePicked(result);
  };

  const confirm = (slot: MealSlot) => {
    if (!estimate) return;
    const meal: LoggedMeal = { id: `m-${Date.now()}`, slot, ...estimate };
    dispatch({ type: 'LOG_MEAL', meal });
    close();
  };

  return (
    <CaptureModalShell visible={visible} title="AI photo estimate" onClose={close}>
      {step === 'idle' ? (
        <View style={styles.center}>
          <Text style={[Type.secondary, styles.hint]}>Snap or choose a photo of your meal and get an instant nutrition estimate.</Text>
          <View style={{ width: '100%', gap: Spacing.sm }}>
            <PillButton label="Take photo" icon="camera" onPress={takePhoto} />
            <PillButton label="Choose from library" icon="images" variant="secondary" onPress={pickFromLibrary} />
          </View>
        </View>
      ) : null}

      {step === 'estimating' ? (
        <View style={styles.center}>
          {photoUri ? <Image source={{ uri: photoUri }} style={styles.preview} contentFit="cover" /> : null}
          <ActivityIndicator color={Colors.primary} size="large" style={{ marginTop: Spacing.lg }} />
          <Text style={[Type.secondary, { marginTop: Spacing.md }]}>Analyzing your meal…</Text>
        </View>
      ) : null}

      {step === 'result' && estimate ? (
        <View style={{ flex: 1 }}>
          {photoUri ? <Image source={{ uri: photoUri }} style={[styles.preview, { marginBottom: Spacing.lg }]} contentFit="cover" /> : null}
          <EstimateResult estimate={estimate} onConfirm={confirm} onDiscard={reset} footnote="AI estimate from your photo" />
        </View>
      ) : null}

      {step === 'error' ? (
        <View style={styles.center}>
          <Text style={[Type.secondary, { textAlign: 'center', color: Colors.danger }]}>{error}</Text>
          <PillButton label="Try again" variant="secondary" onPress={reset} style={{ marginTop: Spacing.lg }} />
        </View>
      ) : null}
    </CaptureModalShell>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: Spacing.xxl, gap: Spacing.lg },
  hint: { textAlign: 'center', paddingHorizontal: Spacing.lg },
  preview: { width: '100%', height: 200, borderRadius: Radius.lg },
});
