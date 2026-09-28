import { auth } from "@/backend/firebase";

/**
 * All localStorage keys used during vendor onboarding.
 */
export const ONBOARDING_KEYS = [
  "vendor_onboarding_step2",
  "vendor_onboarding_step3",
  "vendor_onboarding_step4",
  "vendor_onboarding_step5",
  "vendor_onboarding_step6",
  "vendor_onboarding_step7",
  "vendor_onboarding_step7_complete",
  "vendor_onboarding_step8_unlocked",
  "vendor_onboarding_step8",
  "vendor_onboarding_step9",
  "vendor_onboarding_uid",
];

/**
 * Clear all onboarding localStorage data.
 */
export function clearOnboardingCache() {
  ONBOARDING_KEYS.forEach((k) => localStorage.removeItem(k));
}

/**
 * Call this at the top of every onboarding page useEffect.
 * If the cached UID doesn't match the currently signed-in user,
 * wipe ALL onboarding cache so stale data from a previous vendor
 * never leaks into a new session.
 *
 * @returns true if the cache was valid (same user), false if it was cleared.
 */
export function validateOnboardingSession(): boolean {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) return false;

  const cachedUid = localStorage.getItem("vendor_onboarding_uid");

  if (cachedUid !== currentUid) {
    // Different user — wipe all stale data
    // clearOnboardingCache();
    // Stamp the new user
    localStorage.setItem("vendor_onboarding_uid", currentUid);
    return false; // cache was stale
  }

  return true; // cache belongs to this user
}
