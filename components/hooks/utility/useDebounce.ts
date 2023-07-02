import React, { useEffect, useState } from "react";

/**
 * Debounced state
 * @param initialValue Initial state
 * @param delay delay in ms
 * @returns [non debounced value, debounced value, setter function]
 */
function useDebounce<T>(
  initialValue: T,
  delay: number
): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return [value, debouncedValue, setValue];
}

export default useDebounce;
