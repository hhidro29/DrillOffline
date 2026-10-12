export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type Choice = 'A' | 'B' | 'C' | 'D' | null;
export type NetworkMode = 'online' | 'offline';
export type AttemptStatus = 'not_started' | 'active' | 'reviewing' | 'locked' | 'terminated';
export type UploadStatus = 'idle' | 'uploading' | 'failed';
export type SyncStatus = 'saved' | 'pending_sync';
export type RewardStatus = 'hidden' | 'available';

export type AttemptSnapshot = {
  screen: ScreenId;
  reviewOrigin: 7 | 8;
  consent: boolean;
  downloadProgress: number;
  answers: Record<number, Choice>;
  doubtful: number[];
  network: NetworkMode;
  attemptStatus: AttemptStatus;
  timeRemaining: number;
  networkWarningSeconds: number | null;
  syncStatus: SyncStatus;
  uploadStatus: UploadStatus;
  rewardStatus: RewardStatus;
};

export const INITIAL_ATTEMPT_SECONDS = 272;
export const NETWORK_WARNING_SECONDS = 25;
export const ATTEMPT_BOUNDARY: readonly ScreenId[] = [7, 8, 9, 10, 11];
export const STEP_LABELS = ['Rules', 'Download', 'Offline', 'Ready'] as const;
export const SCREEN_NAMES: Record<ScreenId, string> = {
  1: 'Rules & consent',
  2: 'Download package',
  3: 'Downloading package',
  4: 'Turn off internet',
  5: 'Ready to start',
  6: 'Start tryout',
  7: 'Question 1',
  8: 'Question 2',
  9: 'Review answers',
  10: 'Save result',
  11: 'Next subtest',
  12: 'Turn on internet',
  13: 'Upload result',
  14: 'Tryout result',
};

export function isAttemptScreen(screen: ScreenId): boolean {
  return ATTEMPT_BOUNDARY.includes(screen);
}

export function getScrollOwner(screen: ScreenId): 'fixed' | 'document' | 'internal' {
  if (screen === 4 || screen === 7 || screen === 8) return 'document';
  if (screen === 9 || screen === 12) return 'internal';
  return 'fixed';
}
