// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";
import { localStorageWrapper } from "../utils/localStorageWrapper";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | null>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    localStorageWrapper.getItem(key).then((value) => {
      if (value) {
        setStoredValue(JSON.parse(value));
      }
      setLoading(false);
    });
  }, [key]);

  const setValue = (value: T) => {
    setLoading(true);
    localStorageWrapper.setItem(key, JSON.stringify(value)).then(() => {
      setStoredValue(value);
      setLoading(false);
    });
  };

  const removeValue = () => {
    setLoading(true);
    localStorageWrapper.removeItem(key).then(() => {
      setStoredValue(null);
      setLoading(false);
    });
  };

  return { storedValue, setValue, removeValue, loading };
};
