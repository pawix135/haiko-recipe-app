import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input"
import { Recipe } from "@/types/recipe";

const ACCEPTED_FILE_TYPES = ["jpeg", "png", "jpg"];

export const ThumbnailImage: React.FC = () => {

  const form = useFormContext<Recipe>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;

    if (!files || files.length < 1) return;

    const file = files[0];
    const splitFileName = file.name.split('.');

    if (!ACCEPTED_FILE_TYPES.includes(splitFileName[splitFileName.length - 1])) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 150;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 150, 150);
          const base64Image = canvas.toDataURL("image/jpeg").slice(23);
          form.setValue('thumb.nail', base64Image);
        }
        canvas.remove();
      };
      if (event.target) {
        img.src = event.target.result as string;
      }
    };

    reader.readAsDataURL(file);

  }

  return (
    <div className="self-end">
      <Input className="hidden" id="thumbnail" type="file" onChange={handleFileChange} accept="image/jpeg,image/png" />
    </div>
  )
}