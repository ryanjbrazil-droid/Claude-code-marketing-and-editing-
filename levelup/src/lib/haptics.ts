/**
 * Haptic feedback placeholders.
 *
 * The MVP ships without expo-haptics; these named hooks mark every point in
 * the UI that should buzz once the dependency lands. Swap the bodies for
 * `Haptics.selectionAsync()` / `Haptics.notificationAsync(...)` later — the
 * call sites are already correct.
 */

/** Light tick — toggles, chips, segment changes. */
export function hapticSelect() {
  // TODO(expo-haptics): Haptics.selectionAsync()
}

/** Medium tap — button presses, set completion. */
export function hapticImpact() {
  // TODO(expo-haptics): Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

/** Success buzz — quest complete, level up, streak secured. */
export function hapticSuccess() {
  // TODO(expo-haptics): Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
}
