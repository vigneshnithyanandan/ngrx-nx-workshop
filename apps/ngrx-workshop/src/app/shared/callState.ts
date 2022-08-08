export enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export interface ErrorState {
  errorMsg: string;
}

export enum CancelState {
  CANCEL = 'CANCEL',
}

// Combine the Loading state and Error state
export type CallState = LoadingState | ErrorState;

// Helper function to extract error, if there is one.
export function getCallStateError(callState: CallState): string | null {
  return (callState as ErrorState)?.errorMsg ?? null;
}
