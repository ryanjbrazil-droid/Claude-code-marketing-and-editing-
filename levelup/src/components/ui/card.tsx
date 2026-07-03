import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';

/** The one card surface: 20pt radius, hairline border, soft resting shadow. */
export function Card({ style, children, ...rest }: ViewProps) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    padding: Spacing.lg,
    ...Shadow.card,
  },
});
