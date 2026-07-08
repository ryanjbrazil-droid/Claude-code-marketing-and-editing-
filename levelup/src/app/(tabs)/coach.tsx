import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconBubble } from '@/components/ui/misc';
import { Colors, Radius, Spacing, Type } from '@/constants/theme';
import { QUICK_PROMPTS } from '@/lib/coach';
import { useApp } from '@/state/app-context';

/** Three-dot typing indicator — the pause is what makes the coach feel present. */
function TypingDots() {
  const anims = useRef([new Animated.Value(0.3), new Animated.Value(0.3), new Animated.Value(0.3)]).current;

  useEffect(() => {
    const loops = anims.map((a, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(a, { toValue: 1, duration: 320, useNativeDriver: true }),
          Animated.timing(a, { toValue: 0.3, duration: 320, useNativeDriver: true }),
          Animated.delay((2 - i) * 160),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims]);

  return (
    <View style={styles.bubbleRow}>
      <IconBubble icon="flash" color={Colors.purple} size={28} />
      <View style={[styles.bubble, styles.bubbleCoach, styles.typingBubble]}>
        {anims.map((a, i) => (
          <Animated.View key={i} style={[styles.typingDot, { opacity: a }]} />
        ))}
      </View>
    </View>
  );
}

export default function CoachScreen() {
  const { state, dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const mounted = useRef(true);

  useEffect(() => {
    // Keep the latest message (or typing indicator) in view.
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [state.chat.length, typing]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    dispatch({ type: 'USER_CHAT', text: trimmed });
    setInput('');
    setTyping(true);
    // The reply always lands, even if the user leaves the screen mid-typing —
    // dispatch targets app-level state; only the local indicator is guarded.
    setTimeout(() => {
      dispatch({ type: 'COACH_REPLY', prompt: trimmed });
      if (mounted.current) setTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.bottom + 48}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <IconBubble icon="chatbubbles" color={Colors.purple} size={42} />
        <View style={{ flex: 1 }}>
          <Text style={Type.heading}>Coach</Text>
          <Text style={Type.small}>
            {state.profile.coachPersonality} mode · witness to your whole journey
          </Text>
        </View>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={[Type.small, { color: Colors.success }]}>Active</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}>
        {state.chat.map((m) => (
          <View key={m.id} style={[styles.bubbleRow, m.from === 'user' && { justifyContent: 'flex-end' }]}>
            {m.from === 'coach' ? <IconBubble icon="flash" color={Colors.purple} size={28} /> : null}
            <View style={[styles.bubble, m.from === 'user' ? styles.bubbleUser : styles.bubbleCoach]}>
              <Text style={[Type.body, { lineHeight: 21 }, m.from === 'user' && { color: '#06131D' }]}>{m.text}</Text>
            </View>
          </View>
        ))}
        {typing ? <TypingDots /> : null}
      </ScrollView>

      {/* Quick prompts */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.prompts}
        style={{ flexGrow: 0 }}>
        {QUICK_PROMPTS.map((p) => (
          <Pressable key={p} onPress={() => send(p)} style={({ pressed }) => [styles.prompt, pressed && { opacity: 0.7 }]}>
            <Text style={[Type.small, { color: Colors.primary }]}>{p}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputRow, { paddingBottom: Spacing.md }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Message your coach…"
          placeholderTextColor={Colors.textMuted}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        <Pressable onPress={() => send(input)} style={styles.sendBtn}>
          <Ionicons name="arrow-up" size={20} color="#06131D" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.successSoft,
    borderRadius: Radius.full,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.success },
  messages: { padding: Spacing.lg, gap: Spacing.md },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm },
  bubble: {
    maxWidth: '80%',
    borderRadius: Radius.lg,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
  },
  bubbleCoach: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 6,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 6,
  },
  typingBubble: {
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 16,
    alignItems: 'center',
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.textSecondary,
  },
  prompts: { gap: Spacing.sm, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  prompt: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(76, 184, 255, 0.35)',
    backgroundColor: Colors.primarySoft,
    minHeight: 38,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    color: Colors.text,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    fontSize: 15,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
