import { useEffect, useCallback } from 'react';

const useOnClickOutside = (ref, handler) => {
  const handleClickOutside = useCallback(
    (event) => {
      if (handler && ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    },
    [handler, ref]
  );

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOnClickOutside;
