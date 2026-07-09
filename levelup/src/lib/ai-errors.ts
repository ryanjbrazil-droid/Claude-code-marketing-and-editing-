import Anthropic from '@anthropic-ai/sdk';

/** Turns an Anthropic SDK error into a short, user-facing message instead of raw JSON. */
export function friendlyApiError(err: unknown): string {
  if (err instanceof Anthropic.RateLimitError) return 'Claude is rate-limited right now — try again in a few seconds.';
  if (err instanceof Anthropic.APIConnectionError) return 'Could not reach Claude — check your connection and try again.';
  if (err instanceof Anthropic.APIError) {
    if (err.status === 529) return 'Claude is temporarily overloaded — try again in a moment.';
    if (typeof err.status === 'number' && err.status >= 500) return 'Claude had a server error — try again in a moment.';
    return 'Something went wrong generating that — try again.';
  }
  return err instanceof Error ? err.message : 'Unknown error.';
}
