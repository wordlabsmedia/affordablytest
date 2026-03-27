import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import Colors, { brand } from '@/constants/Colors';
import { useAppStore } from '@/store/useAppStore';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

const AffordablyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: brand.accent,
    background: '#0F1F1B',
    card: '#1A3C34',
    text: '#F1F5F9',
    border: '#2D5A4E',
  },
};

const AffordablyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: brand.primary,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1A3C34',
    border: '#E2E8F0',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const isDark = useAppStore((s) => s.isDarkMode);

  return (
    <ThemeProvider value={isDark ? AffordablyDarkTheme : AffordablyLightTheme}>
      <View style={webStyles.container}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="policy/[id]"
            options={{
              title: 'Policy Details',
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="comparison/[id]"
            options={{
              title: 'Plan Comparison',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="benefit/[id]"
            options={{
              title: 'Benefit Details',
              presentation: 'modal',
            }}
          />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

const webStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 430 : undefined,
    alignSelf: 'center',
  },
});
