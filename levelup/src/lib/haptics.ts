import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Haptic feedback. Real on iOS/Android via expo-haptics; silent no-op on web.
 * Failures are swallowed — feedback must never break an interaction.
 */

const native = Platform.OS === 'ios' || Platform.OS === 'android';

/** Light tick — toggles, chips, segment changes. */
export function hapticSelect() {
  if (!native) return;
  Haptics.selectionAsync().catch(() => {});
}

/** Medium tap — button presses, set completion. */
export function hapticImpact() {
  if (!native) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
}

/** Success buzz — quest complete, level up, streak secured. */
export function hapticSuccess() {
  if (!native) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}
