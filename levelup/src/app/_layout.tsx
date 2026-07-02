import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { RewardToast } from '@/components/ui/reward-toast';
import { Colors } from '@/constants/theme';
import { AppProvider, useApp } from '@/state/app-context';

SplashScreen.preventAutoHideAsync();

const LevelUpTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Colors.primary,
    background: Colors.bg,
    card: Colors.bgElevated,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.flame,
  },
};

function Root() {
  const { state } = useApp();

  useEffect(() => {
    if (state.hydrated) SplashScreen.hideAsync();
  }, [state.hydrated]);

  if (!state.hydrated) return <View style={{ flex: 1, backgroundColor: Colors.bg }} />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bg } }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workout-session" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
      <RewardToast />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <ThemeProvider value={LevelUpTheme}>
        <StatusBar style="light" />
        <Root />
      </ThemeProvider>
    </AppProvider>
  );
}
