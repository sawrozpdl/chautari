export const redirectTo = (url: string, newTab: boolean = false) => {
  return () => {
    if (newTab) {
      window.open(url);
    } else {
      window.location.href = url;
    }
    return null;
  };
};
