import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { PillButton } from '@/components/ui/pill-button';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { lookupBarcode } from '@/lib/barcode';
import type { LoggedMeal, MealSlot } from '@/lib/types';
import { useApp } from '@/state/app-context';

import { CaptureModalShell } from './capture-modal-shell';
import { EstimateResult, type MealEstimate } from './estimate-result';

type Step = 'scanning' | 'looking-up' | 'result' | 'error';

const BARCODE_TYPES = ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128'] as const;

export function BarcodeScanModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [step, setStep] = useState<Step>('scanning');
  const [estimate, setEstimate] = useState<(MealEstimate & { perServing: boolean }) | null>(null);
  const [error, setError] = useState('');
  const [scannedOnce, setScannedOnce] = useState(false);

  const reset = useCallback(() => {
    setStep('scanning');
    setEstimate(null);
    setError('');
    setScannedOnce(false);
  }, []);

  const close = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onBarcodeScanned = async (result: { data: string }) => {
    if (scannedOnce) return;
    setScannedOnce(true);
    setStep('looking-up');
    try {
      const product = await lookupBarcode(result.data);
      setEstimate(product);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lookup failed.');
      setStep('error');
    }
  };

  const confirm = (slot: MealSlot) => {
    if (!estimate) return;
    const meal: LoggedMeal = {
      id: `m-${Date.now()}`,
      slot,
      name: estimate.name,
      calories: estimate.calories,
      protein: estimate.protein,
      carbs: estimate.carbs,
      fats: estimate.fats,
    };
    dispatch({ type: 'LOG_MEAL', meal });
    close();
  };

  return (
    <CaptureModalShell visible={visible} title="Scan barcode" onClose={close}>
      {step === 'scanning' ? (
        !permission?.granted ? (
          <View style={styles.center}>
            <Text style={[Type.secondary, styles.hint]}>LevelUp needs camera access to scan product barcodes.</Text>
            <PillButton label="Grant camera access" onPress={requestPermission} />
          </View>
        ) : (
          <View style={styles.scanWrap}>
            <CameraView
              style={StyleSheet.absoluteFill}
              barcodeScannerSettings={{ barcodeTypes: [...BARCODE_TYPES] }}
              onBarcodeScanned={onBarcodeScanned}
            />
            <View style={styles.frame} pointerEvents="none" />
            <Text style={[Type.secondary, styles.scanHint]}>Point the camera at a product barcode</Text>
          </View>
        )
      ) : null}

      {step === 'looking-up' ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text style={[Type.secondary, { marginTop: Spacing.lg }]}>Looking up product…</Text>
        </View>
      ) : null}

      {step === 'result' && estimate ? (
        <EstimateResult
          estimate={estimate}
          onConfirm={confirm}
          onDiscard={reset}
          footnote={estimate.perServing ? 'Per serving · Open Food Facts' : 'Per 100g · Open Food Facts'}
        />
      ) : null}

      {step === 'error' ? (
        <View style={styles.center}>
          <Text style={[Type.secondary, { textAlign: 'center', color: Colors.danger }]}>{error}</Text>
          <PillButton label="Scan again" variant="secondary" onPress={reset} style={{ marginTop: Spacing.lg }} />
        </View>
      ) : null}
    </CaptureModalShell>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: Spacing.xxl, gap: Spacing.lg },
  hint: { textAlign: 'center', paddingHorizontal: Spacing.lg },
  scanWrap: { flex: 1, borderRadius: Radius.lg, overflow: 'hidden', backgroundColor: Colors.card },
  frame: {
    position: 'absolute',
    top: '30%',
    left: '12%',
    right: '12%',
    height: '20%',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: Radius.md,
  },
  scanHint: {
    position: 'absolute',
    bottom: Spacing.xl,
    alignSelf: 'center',
    color: Colors.text,
  },
});
