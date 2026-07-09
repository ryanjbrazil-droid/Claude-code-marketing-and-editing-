/**
 * LevelUp design system v2 — dark-first, premium, athletic.
 *
 * Principles:
 *  - Rich charcoal neutrals; color is earned, not decorative.
 *  - Bright hues are reserved for XP, achievements, and the one primary action.
 *  - Typography carries hierarchy before color does.
 *  - One spacing grid (4pt), one card radius, one hairline everywhere.
 */

export const Colors = {
  // Neutrals — warm charcoal, not navy.
  bg: '#0A0C10',
  bgElevated: '#10131A',
  card: '#141821',
  cardPressed: '#1A1F2A',
  border: 'rgba(255, 255, 255, 0.06)',
  borderStrong: 'rgba(255, 255, 255, 0.14)',

  // Text — AA contrast on card surfaces.
  text: '#F5F7FA',
  textSecondary: '#9BA6B7',
  textMuted: '#7C8698',

  // Primary action — a single confident blue.
  primary: '#4CB8FF',
  primaryDeep: '#1E90E8',
  primarySoft: 'rgba(76, 184, 255, 0.12)',

  // XP / achievement gold — the loudest color in the app. Use sparingly.
  xp: '#F7C948',
  xpDeep: '#E8A317',
  xpSoft: 'rgba(247, 201, 72, 0.12)',

  // Streak flame.
  flame: '#FF9E57',
  flameDeep: '#F97316',
  flameSoft: 'rgba(255, 158, 87, 0.12)',

  // Semantic + category accents (calm, desaturated a touch).
  success: '#4ADE9C',
  successSoft: 'rgba(74, 222, 156, 0.12)',
  danger: '#F87171',
  dangerSoft: 'rgba(248, 113, 113, 0.12)',
  purple: '#A78BFA',
  purpleSoft: 'rgba(167, 139, 250, 0.12)',
  cyan: '#38D6E0',
  cyanSoft: 'rgba(56, 214, 224, 0.12)',
  pink: '#F284B8',
  pinkSoft: 'rgba(242, 132, 184, 0.12)',

  tabBar: 'rgba(12, 14, 19, 0.98)',
  overlay: 'rgba(6, 8, 11, 0.78)',
} as const;

/** 4pt spacing grid. Screen gutter is Spacing.gutter. */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  gutter: 20,
} as const;

/** One radius language: cards 20, controls 14, chips/pills full. */
export const Radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

/**
 * Type scale. Weight + size communicate importance; color is secondary.
 * `stat` uses tabular numerals so counters don't jitter as they change.
 */
export const Type = {
  hero: { fontSize: 34, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.8, lineHeight: 40 },
  title: { fontSize: 26, fontWeight: '800' as const, color: Colors.text, letterSpacing: -0.6, lineHeight: 32 },
  heading: { fontSize: 19, fontWeight: '700' as const, color: Colors.text, letterSpacing: -0.4 },
  cardTitle: { fontSize: 16, fontWeight: '700' as const, color: Colors.text, letterSpacing: -0.2 },
  body: { fontSize: 15, fontWeight: '500' as const, color: Colors.text, lineHeight: 21 },
  secondary: { fontSize: 14, fontWeight: '500' as const, color: Colors.textSecondary, lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '500' as const, color: Colors.textMuted, lineHeight: 16 },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.textMuted,
    letterSpacing: 1.4,
    textTransform: 'uppercase' as const,
  },
  stat: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text,
    letterSpacing: -0.4,
    fontVariant: ['tabular-nums' as const] as ('tabular-nums')[],
  },
  button: { fontSize: 16, fontWeight: '700' as const, letterSpacing: 0.1 },
} as const;

export const Shadow = {
  /** Colored glow — achievements and the primary CTA only. */
  glow: (color: string, radius = 12, opacity = 0.45) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: 6,
  }),
  /** Default resting card shadow — soft and low. */
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;

/** Shared motion constants so every animation feels like the same hand. */
export const Motion = {
  spring: { friction: 8, tension: 60 },
  pressScale: 0.97,
  durationFast: 160,
  durationBase: 260,
  durationSlow: 420,
} as const;

/** Minimum comfortable touch target (Apple HIG). */
export const TouchTarget = 44;
