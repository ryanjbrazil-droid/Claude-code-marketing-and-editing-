import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { CaptureModalShell } from '@/components/nutrition/capture-modal-shell';
import { Segmented } from '@/components/ui/misc';
import { PillButton } from '@/components/ui/pill-button';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { useApp } from '@/state/app-context';

const LABELS = ['Chest', 'Waist', 'Arms', 'Thighs'] as const;

export function LogMeasurementModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useApp();
  const [label, setLabel] = useState<(typeof LABELS)[number]>('Waist');
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch({ type: 'LOG_MEASUREMENT', label, value: trimmed });
    setValue('');
    onClose();
  };

  return (
    <CaptureModalShell visible={visible} title="Log measurement" onClose={onClose}>
      <View style={{ gap: Spacing.lg }}>
        <Text style={Type.secondary}>Which measurement?</Text>
        <Segmented options={LABELS} value={label} onChange={setLabel} />
        <Text style={Type.secondary}>Value (e.g. 33.5 in)</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder="0 in"
          placeholderTextColor={Colors.textMuted}
          autoFocus
        />
        <PillButton label="Log measurement" icon="checkmark" onPress={submit} disabled={!value.trim()} />
      </View>
    </CaptureModalShell>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    fontSize: 15,
  },
});
