import { useEffect, useState } from 'react';
import { formatTime } from 'utils';

export function useTime(): string {
  const [time, setTime] = useState(formatTime(new Date(), 'hh:mm'));

  useEffect(
    () => {
      const timerId = setInterval(() => {
        const current = new Date();
        if (current.getSeconds() === 0) {
          setTime(formatTime(current, 'hh:mm'));
        }
      }, 1000);
      return () => clearTimeout(timerId);
    }, []
  );
  return time;
}

export function useDebounce(value: number | string, delay: number): string | number {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const timerId = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(timerId);
    }, [value, delay]
  );
  return debouncedValue;
}