/**
 * LevelUp design system — dark-first, premium RPG dashboard.
 */
export const Colors = {
  bg: '#070B12',
  bgElevated: '#0C1320',
  card: '#111A2B',
  cardPressed: '#16213599',
  border: 'rgba(148, 184, 255, 0.10)',
  borderStrong: 'rgba(148, 184, 255, 0.22)',

  text: '#F2F6FC',
  textSecondary: '#93A6C4',
  textMuted: '#5C6E8A',

  primary: '#38BDF8',
  primaryDeep: '#0EA5E9',
  primarySoft: 'rgba(56, 189, 248, 0.14)',

  xp: '#FACC15',
  xpDeep: '#EAB308',
  xpSoft: 'rgba(250, 204, 21, 0.14)',

  flame: '#FB923C',
  flameDeep: '#F97316',
  flameSoft: 'rgba(251, 146, 60, 0.14)',

  success: '#34D399',
  successSoft: 'rgba(52, 211, 153, 0.14)',
  danger: '#F87171',
  dangerSoft: 'rgba(248, 113, 113, 0.14)',
  purple: '#A78BFA',
  purpleSoft: 'rgba(167, 139, 250, 0.14)',
  cyan: '#22D3EE',
  cyanSoft: 'rgba(34, 211, 238, 0.14)',
  pink: '#F472B6',
  pinkSoft: 'rgba(244, 114, 182, 0.14)',

  tabBar: '#0A101B',
  overlay: 'rgba(4, 7, 12, 0.72)',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const Radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 26,
  full: 999,
} as const;

export const Type = {
  hero: { fontSize: 32, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.5 },
  title: { fontSize: 24, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.4 },
  heading: { fontSize: 18, fontWeight: '700' as const, color: Colors.text, letterSpacing: -0.2 },
  body: { fontSize: 15, fontWeight: '500' as const, color: Colors.text },
  secondary: { fontSize: 14, fontWeight: '500' as const, color: Colors.textSecondary },
  small: { fontSize: 12, fontWeight: '600' as const, color: Colors.textMuted },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  stat: { fontSize: 22, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.3 },
} as const;

export const Shadow = {
  glow: (color: string, radius = 12, opacity = 0.5) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: 6,
  }),
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;
