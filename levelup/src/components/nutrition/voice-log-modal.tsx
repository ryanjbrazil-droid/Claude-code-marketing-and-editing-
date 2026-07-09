import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';

import { PillButton } from '@/components/ui/pill-button';
import { ScalePress } from '@/components/ui/motion';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { estimateFromText } from '@/lib/nutrition-ai';
import type { LoggedMeal, MealSlot } from '@/lib/types';
import { useApp } from '@/state/app-context';

import { CaptureModalShell } from './capture-modal-shell';
import { EstimateResult, type MealEstimate } from './estimate-result';

type Step = 'idle' | 'listening' | 'estimating' | 'result' | 'error';

export function VoiceLogModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useApp();
  const [step, setStep] = useState<Step>('idle');
  const [transcript, setTranscript] = useState('');
  const [estimate, setEstimate] = useState<MealEstimate | null>(null);
  const [error, setError] = useState('');

  const reset = useCallback(() => {
    setStep('idle');
    setTranscript('');
    setEstimate(null);
    setError('');
  }, []);

  const close = useCallback(() => {
    if (step === 'listening') ExpoSpeechRecognitionModule.stop();
    reset();
    onClose();
  }, [step, reset, onClose]);

  useSpeechRecognitionEvent('result', (event) => {
    const text = event.results[0]?.transcript ?? '';
    if (text) setTranscript(text);
  });

  useSpeechRecognitionEvent('end', () => {
    setStep((prev) => (prev === 'listening' ? 'estimating' : prev));
  });

  useSpeechRecognitionEvent('error', (event) => {
    const simulatorUnsupported = event.error === 'service-not-allowed' || event.error === 'audio-capture';
    setError(
      simulatorUnsupported
        ? 'Voice recognition isn’t supported in the iOS Simulator (an Apple limitation since iOS 17) — this works on a real iPhone.'
        : (event.message ?? 'Speech recognition failed.'),
    );
    setStep('error');
  });

  // Once listening ends, kick off the estimate for whatever we captured.
  React.useEffect(() => {
    if (step !== 'estimating') return;
    if (!transcript.trim()) {
      setError('Didn’t catch anything. Try again and describe what you ate.');
      setStep('error');
      return;
    }
    estimateFromText(transcript)
      .then((result) => {
        setEstimate(result);
        setStep('result');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Estimate failed.');
        setStep('error');
      });
  }, [step, transcript]);

  const startListening = async () => {
    const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!perm.granted) {
      setError('Microphone or speech recognition permission was denied.');
      setStep('error');
      return;
    }
    setTranscript('');
    setStep('listening');
    ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: true, continuous: false });
  };

  const confirm = (slot: MealSlot) => {
    if (!estimate) return;
    const meal: LoggedMeal = { id: `m-${Date.now()}`, slot, ...estimate };
    dispatch({ type: 'LOG_MEAL', meal });
    close();
  };

  return (
    <CaptureModalShell visible={visible} title="Voice log" onClose={close}>
      {step === 'idle' ? (
        <View style={styles.center}>
          <Text style={[Type.secondary, styles.hint]}>Tap the mic and describe what you ate — "a chicken burrito and a Coke."</Text>
          <ScalePress onPress={startListening} accessibilityLabel="Start recording" style={styles.micWrap}>
            <View style={styles.micCircle}>
              <Ionicons name="mic" size={40} color={Colors.text} />
            </View>
          </ScalePress>
        </View>
      ) : null}

      {step === 'listening' ? (
        <View style={styles.center}>
          <View style={[styles.micCircle, styles.micCircleActive]}>
            <Ionicons name="mic" size={40} color={Colors.text} />
          </View>
          <Text style={[Type.body, { textAlign: 'center', marginTop: Spacing.lg }]}>{transcript || 'Listening…'}</Text>
          <PillButton label="Done" icon="checkmark" onPress={() => ExpoSpeechRecognitionModule.stop()} style={{ marginTop: Spacing.xl }} />
        </View>
      ) : null}

      {step === 'estimating' ? (
        <View style={styles.center}>
          <ActivityIndicator color={Colors.primary} size="large" />
          <Text style={[Type.secondary, { marginTop: Spacing.lg }]}>Estimating nutrition…</Text>
        </View>
      ) : null}

      {step === 'result' && estimate ? (
        <EstimateResult estimate={estimate} onConfirm={confirm} onDiscard={reset} footnote="AI estimate from your description" />
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: Spacing.xxl },
  hint: { textAlign: 'center', marginBottom: Spacing.xxl, paddingHorizontal: Spacing.lg },
  micWrap: { alignItems: 'center', justifyContent: 'center' },
  micCircle: {
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micCircleActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
});
