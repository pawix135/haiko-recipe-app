import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input"
import { Recipe } from "@/types/recipe";
import { handleImageFileInput } from "@/lib/imageUtil";

export const ThumbnailImage: React.FC = () => {

  const form = useFormContext<Recipe>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    try {
      const data = await handleImageFileInput(e.currentTarget.files);
      if (data.length > 0) form.setValue("thumb.nail", data[0].thumb);
    } catch (error) {
      console.error('Error while handling image file input', error);
    }

  }

  return (
    <div className="self-end">
      <Input className="hidden" id="thumbnail" type="file" onChange={handleFileChange} accept="image/jpeg,image/png" />
    </div>
  )
}