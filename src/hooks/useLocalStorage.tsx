import { Recipe } from "@/types/recipe";
import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: Recipe) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue as Recipe;
    } catch (error) {
      return initialValue as Recipe;
    }
  });

  const setValue = (value: Recipe) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
    }
  };

  return [storedValue, setValue] as const;
};
