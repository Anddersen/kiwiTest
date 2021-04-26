import { useCallback, useEffect } from 'react';

export function useDebounce(effect: () => any, delay: number, deps: any[]) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}
