// External
import * as React from 'react';

// Internal

export function useLatestRef<T>(value: T) {
  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
