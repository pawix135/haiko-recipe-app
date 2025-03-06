import { Input } from "./ui/input"
import { Recipe } from "@/types/recipe";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export const ImportRecipe: React.FC = () => {

  const form = useFormContext<Recipe>();
  const [error, setError] = useState<string | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    setError(null);

    const files = e.target.files;

    if (!files || files.length < 1) return;

    const file = files[0];
    if (!file.name.endsWith(".mrv")) {
      setError('Invalid file type');
      return
    }

    let rawString: string;
    try {
      rawString = await file.text();
      if (!rawString || rawString.length < 1) throw new Error();
    } catch (error) {
      setError('Invalid file content');
      return;
    }

    let recipe: Recipe[];
    try {
      recipe = JSON.parse(rawString) as Recipe[];
      if (!recipe) throw new Error();
    } catch (error) {
      setError("Invalid recipe content");
      return;
    }

    form.reset(recipe[0]);
    setError(null);
  }

  return (
    <>
      <div className="flex flex-row space-x-2">
        <Input type="file" onChange={onFileChange} />
      </div>
      {error && <div className="text-red-500">Something wrong: {error}</div>}
    </>
  )
}