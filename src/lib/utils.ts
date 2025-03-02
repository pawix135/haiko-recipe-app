import { Recipe } from "@/types/recipe";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateId = (): string => {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  const date = new Date();
  const dateSuffix = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  return `${randomNumber}${dateSuffix}`;

}

export const encodeRecipeData = (values: Recipe) => {
  return encodeURIComponent(JSON.stringify([values], null, 0))
}

export const saveRecipeAsFile = (values: Recipe) => {
  const data = JSON.stringify([values], null, 0);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${values.infos.name}.mrv`;
  a.click();
}

export const openRecipeInApp = (values: Recipe) => {
  const urlEncoded = `mrv://${encodeRecipeData(values)}`;
  window.open(urlEncoded, '_blank');
}  
