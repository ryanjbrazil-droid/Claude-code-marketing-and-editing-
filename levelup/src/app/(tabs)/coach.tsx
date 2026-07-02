import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
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

export default function CoachScreen() {
  const { state, dispatch } = useApp();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Keep the latest message in view.
    const t = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(t);
  }, [state.chat.length]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: 'SEND_CHAT', text: trimmed });
    setInput('');
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
            {state.profile.coachPersonality} mode · knows your plan, streak & macros
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
              <Text style={[Type.body, { lineHeight: 21 }, m.from === 'user' && { color: '#04121D' }]}>{m.text}</Text>
            </View>
          </View>
        ))}
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
          <Ionicons name="arrow-up" size={20} color="#04121D" />
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
  prompts: { gap: Spacing.sm, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  prompt: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
    backgroundColor: Colors.primarySoft,
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
