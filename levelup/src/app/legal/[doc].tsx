import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { Spacing, Type } from '@/constants/theme';
import { LEGAL_DOCS } from '@/lib/legal-content';

/** Renders **bold** segments and blank-line paragraph breaks from plain markdown-lite content. */
function Paragraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={[Type.secondary, { lineHeight: 22 }]}>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <Text key={i} style={{ color: Type.body.color, fontWeight: '700' }}>
            {part.slice(2, -2)}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        ),
      )}
    </Text>
  );
}

export default function LegalDocScreen() {
  const { doc } = useLocalSearchParams<{ doc: string }>();
  const entry = LEGAL_DOCS[doc ?? ''];

  if (!entry) {
    return (
      <Screen title="Not found" back>
        <Card>
          <Text style={Type.secondary}>This document doesn't exist.</Text>
        </Card>
      </Screen>
    );
  }

  return (
    <Screen title={entry.title} subtitle={`Last updated ${entry.updated}`} back>
      <Card style={{ gap: Spacing.lg }}>
        {entry.body.split('\n\n').map((para, i) => (
          <Paragraph key={i} text={para} />
        ))}
      </Card>
      <View style={{ height: Spacing.xl }} />
    </Screen>
  );
}
