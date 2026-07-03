import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { hapticSuccess } from '@/lib/haptics';
import type { Quest } from '@/lib/types';
import { XPBar } from './xp-bar';

interface QuestCardProps {
  quest: Quest;
  onToggle: (id: string) => void;
}

/**
 * Quest row. Calm at rest — icon, title, quiet XP value — and celebratory
 * only at the moment of completion (spring pop + check fill). Done quests
 * recede visually so the remaining work stays the focus.
 */
export function QuestCard({ quest, onToggle }: QuestCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const check = useRef(new Animated.Value(quest.done ? 1 : 0)).current;
  const wasDone = useRef(quest.done);

  useEffect(() => {
    if (quest.done !== wasDone.current) {
      Animated.spring(check, { toValue: quest.done ? 1 : 0, useNativeDriver: true, friction: 5 }).start();
      if (quest.done) {
        hapticSuccess();
        Animated.sequence([
          Animated.spring(scale, { toValue: 1.03, useNativeDriver: true, speed: 40 }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
        ]).start();
      }
    }
    wasDone.current = quest.done;
  }, [quest.done, scale, check]);

  const hasProgress = quest.target != null && quest.progress != null && !quest.done;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => onToggle(quest.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: quest.done }}
        accessibilityLabel={`${quest.title}, ${quest.xp} XP${quest.done ? ', complete' : ''}`}
        style={({ pressed }) => [styles.card, quest.done && styles.cardDone, pressed && { backgroundColor: Colors.cardPressed }]}>
        <View style={[styles.iconWrap, { backgroundColor: `${quest.color}1E` }]}>
          <Ionicons name={quest.icon} size={19} color={quest.done ? Colors.textMuted : quest.color} />
        </View>

        <View style={styles.body}>
          <Text style={[Type.cardTitle, { fontSize: 15 }, quest.done && styles.titleDone]} numberOfLines={1}>
            {quest.title}
          </Text>
          {hasProgress ? (
            <View style={{ marginTop: 7, gap: 5 }}>
              <XPBar value={quest.progress!} max={quest.target!} height={4} colors={[quest.color, quest.color]} glow={false} />
              <Text style={Type.small}>
                {quest.progress!.toLocaleString()} / {quest.target!.toLocaleString()} {quest.unit}
              </Text>
            </View>
          ) : (
            <Text style={[Type.small, { marginTop: 2 }, quest.done && { color: Colors.success }]}>
              {quest.done ? 'Proof added' : `+${quest.xp} XP`}
            </Text>
          )}
        </View>

        <View style={styles.right}>
          {hasProgress ? <Text style={styles.xp}>+{quest.xp}</Text> : null}
          <View style={[styles.check, quest.done && styles.checkDone]}>
            <Animated.View style={{ opacity: check, transform: [{ scale: check }] }}>
              <Ionicons name="checkmark" size={15} color="#06131D" />
            </Animated.View>
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
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderStrong,
    paddingVertical: 14,
    paddingHorizontal: Spacing.lg,
    minHeight: 64,
  },
  cardDone: {
    backgroundColor: Colors.bgElevated,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1 },
  titleDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  right: { alignItems: 'flex-end', gap: 6, flexDirection: 'row' },
  xp: { fontSize: 13, fontWeight: '700', color: Colors.textSecondary, fontVariant: ['tabular-nums'] },
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
});
