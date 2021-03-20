import { useCallback, useEffect } from 'react';

const useDebounce = (func: any, delay: number, deps: Array<any>): void => {
  const callback = useCallback(func, deps);

  useEffect(() => {
    const handler = setTimeout(callback, delay);

    return (): void => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useDebounce;
