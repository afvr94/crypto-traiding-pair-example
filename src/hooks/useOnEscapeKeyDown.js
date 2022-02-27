import { useEffect, useCallback } from 'react';

const useOnEscapeKeyDown = (handler) => {
  const handleOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27 && handler) {
        handler();
      }
    },
    [handler]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', handleOnEscapeKeyDown);
    };
  }, [handleOnEscapeKeyDown]);
};

export default useOnEscapeKeyDown;
