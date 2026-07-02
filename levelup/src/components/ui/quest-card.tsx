import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import type { Quest } from '@/lib/types';
import { XPBar } from './xp-bar';

interface QuestCardProps {
  quest: Quest;
  onToggle: (id: string) => void;
}

export function QuestCard({ quest, onToggle }: QuestCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const wasDone = useRef(quest.done);

  useEffect(() => {
    if (quest.done && !wasDone.current) {
      // Completion pop animation.
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.04, useNativeDriver: true, speed: 40 }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
      ]).start();
    }
    wasDone.current = quest.done;
  }, [quest.done, scale]);

  const hasProgress = quest.target != null && quest.progress != null && !quest.done;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => onToggle(quest.id)}
        style={({ pressed }) => [styles.card, quest.done && styles.cardDone, pressed && { opacity: 0.85 }]}>
        <View style={[styles.iconWrap, { backgroundColor: `${quest.color}22` }]}>
          <Ionicons name={quest.icon} size={20} color={quest.color} />
        </View>

        <View style={styles.body}>
          <Text style={[Type.body, quest.done && styles.titleDone]} numberOfLines={1}>
            {quest.title}
          </Text>
          {hasProgress ? (
            <View style={{ marginTop: 6, gap: 4 }}>
              <XPBar value={quest.progress!} max={quest.target!} height={6} colors={[quest.color, quest.color]} />
              <Text style={Type.small}>
                {quest.progress!.toLocaleString()} / {quest.target!.toLocaleString()} {quest.unit}
              </Text>
            </View>
          ) : (
            <Text style={[Type.small, { marginTop: 2 }]}>{quest.done ? 'Complete' : 'Tap to complete'}</Text>
          )}
        </View>

        <View style={styles.right}>
          <Text style={[styles.xp, quest.done && { color: Colors.textMuted }]}>+{quest.xp} XP</Text>
          <View style={[styles.check, quest.done && styles.checkDone]}>
            {quest.done ? <Ionicons name="checkmark" size={16} color="#04121D" /> : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  cardDone: {
    borderColor: 'rgba(52, 211, 153, 0.35)',
    backgroundColor: 'rgba(52, 211, 153, 0.06)',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  titleDone: { textDecorationLine: 'line-through', color: Colors.textSecondary },
  right: { alignItems: 'flex-end', gap: 6 },
  xp: { fontSize: 13, fontWeight: '800', color: Colors.xp },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
});
