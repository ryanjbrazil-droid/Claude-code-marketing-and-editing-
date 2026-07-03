import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { RewardToast } from '@/components/ui/reward-toast';
import { TodaySkeleton } from '@/components/ui/skeleton';
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

  // Skeleton instead of a blank flash while persisted state loads.
  if (!state.hydrated) return <TodaySkeleton />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bg },
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workout-session" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="habits" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="profile" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="legacy" options={{ animation: 'slide_from_right' }} />
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
