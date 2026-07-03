import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/ui/screen';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { LEGACY_CATEGORY_COLOR } from '@/lib/identity';
import { useApp } from '@/state/app-context';

/**
 * Legacy — the permanent timeline of the user's growth. Newest first.
 * Nothing on this screen can ever be edited or deleted; that permanence
 * is the point.
 */
export default function LegacyScreen() {
  const { state } = useApp();
  const events = [...state.legacy].reverse();

  return (
    <Screen title="Legacy" back>
      <Text style={[Type.secondary, { marginBottom: Spacing.sm }]}>
        The permanent record of who you're becoming. {state.legacy.length} milestones and counting — nothing here can
        ever be lost.
      </Text>

      <View style={styles.timeline}>
        {events.map((e, i) => {
          const color = LEGACY_CATEGORY_COLOR[e.category];
          return (
            <View key={e.id} style={styles.row}>
              {/* Rail */}
              <View style={styles.rail}>
                <View style={[styles.node, { borderColor: color, backgroundColor: `${color}22` }]}>
                  <Ionicons name={e.icon} size={15} color={color} />
                </View>
                {i < events.length - 1 ? <View style={styles.railLine} /> : null}
              </View>

              {/* Event */}
              <View style={styles.event}>
                <Text style={Type.small}>{e.date}</Text>
                <Text style={[Type.cardTitle, { marginTop: 2 }]}>{e.title}</Text>
                <Text style={[Type.secondary, { marginTop: 2 }]}>{e.detail}</Text>
              </View>
            </View>
          );
        })}

        {/* Origin cap */}
        <View style={styles.originCap}>
          <Text style={[Type.small, { textAlign: 'center' }]}>
            Everything above was earned. The next entry is up to you.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  timeline: { marginTop: Spacing.sm },
  row: { flexDirection: 'row', gap: Spacing.md },
  rail: { alignItems: 'center', width: 36 },
  node: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  railLine: {
    flex: 1,
    width: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 4,
  },
  event: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  originCap: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
});
