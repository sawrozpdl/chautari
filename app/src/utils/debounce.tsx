const debounce = (
  callback: any,
  waitTime: number,
  initialInvoke = false // For events throttling
): any => {
  let timeout: any;

  return (...args: any): void => {
    const futureFunc = (): void => {
      timeout = null; // Chain of events has ended.
      if (!initialInvoke) {
        callback(...args);
      }
    };

    if (!timeout && initialInvoke) {
      callback(...args);
    }

    clearTimeout(timeout);
    timeout = setTimeout(futureFunc, waitTime);
  };
};

export default debounce;
