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

export const createOpenInAppLink = (urlEncodedRecipe: string): string => `mrv://${urlEncodedRecipe}`;

export const encodeRecipeData = (values: Recipe) => {
  return encodeURIComponent(prepareRecipeToSave(values));
}

export async function logToServer(message: string) {
  try {
    const formData = new FormData();
    formData.append("message", message);

    const response = await fetch("https://rezepte6.de/makemrv/log.php", {
      method: "POST",
      body: formData, 
    });

    if (response.ok) {
      console.log("Send!", message);
    } else {
      console.error("Error!", response.statusText);
    }

  } catch (error) {
    console.error("Cant sent", error);
  }
}

export const saveRecipeAsFile = (values: Recipe) => {
  const data = prepareRecipeToSave(values);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${values.infos.name}.mrv`;
  a.click();
  a.remove();
}

export const openRecipeInApp = (values: Recipe) => {
  window.open(createOpenInAppLink(encodeRecipeData(values)), '_blank');
}

export const prepareRecipeToSave = (values: Recipe): string => {
  try {
    if (values.thumb.nail.length >= 23) values.thumb.nail ;
    return JSON.stringify([values], null, 0);
  } catch (error) {
    throw new Error("Error while preparing recipe to save");
  }
}