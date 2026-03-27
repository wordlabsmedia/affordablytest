import { Platform } from 'react-native';

const serifFont = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'Georgia',
});

const sansFont = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  hero: {
    fontFamily: serifFont,
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  h1: {
    fontFamily: serifFont,
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  h2: {
    fontFamily: serifFont,
    fontSize: 20,
    fontWeight: '700' as const,
    lineHeight: 26,
  },
  h3: {
    fontWeight: '600' as const,
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  captionBold: {
    fontSize: 13,
    fontWeight: '600' as const,
    lineHeight: 18,
  },
  small: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};
