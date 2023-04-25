export interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

export function shortenPubkey(base58: string) {
  return base58.slice(0, 4) + ".." + base58.slice(-4);
}