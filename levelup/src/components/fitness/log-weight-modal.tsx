import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { CaptureModalShell } from '@/components/nutrition/capture-modal-shell';
import { PillButton } from '@/components/ui/pill-button';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { useApp } from '@/state/app-context';

export function LogWeightModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dispatch } = useApp();
  const [value, setValue] = useState('');

  const submit = () => {
    const weightLb = Number(value);
    if (!weightLb || weightLb <= 0) return;
    dispatch({ type: 'LOG_WEIGHT', weightLb });
    setValue('');
    onClose();
  };

  return (
    <CaptureModalShell visible={visible} title="Log weight" onClose={onClose}>
      <View style={{ gap: Spacing.lg }}>
        <Text style={Type.secondary}>Today's body weight (lb)</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(v) => setValue(v.replace(/[^0-9.]/g, ''))}
          placeholder="0"
          placeholderTextColor={Colors.textMuted}
          keyboardType="decimal-pad"
          autoFocus
        />
        <PillButton label="Log weight" icon="checkmark" onPress={submit} disabled={!value} />
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
    fontSize: 20,
    fontWeight: '700',
  },
});
