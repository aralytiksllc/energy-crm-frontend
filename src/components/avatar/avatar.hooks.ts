// External
import * as React from 'react';

// Internal
import { ColorTransformer } from '@/helpers/color-transformer';

export function useAvatarInitials(name?: string): string {
  return React.useMemo(() => {
    const [w1, w2] = (name || '').trim().split(/\s+/);

    const first = w1?.[0] ?? '';
    const second = w2?.[0] ?? '';
    const out = (first + second).toUpperCase();

    return out || '?';
  }, [name]);
}

export function useAvatarStyles(name?: string): React.CSSProperties {
  return React.useMemo(() => {
    const seed = (name || '').trim() || 'Unknown';

    const colors = ColorTransformer.forSeed(seed);

    return {
      backgroundColor: colors.bg,
      color: colors.fg,
      fontWeight: 600,
    };
  }, [name]);
}
