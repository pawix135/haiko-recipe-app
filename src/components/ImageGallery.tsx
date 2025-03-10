import { useFieldArray, useFormContext } from "react-hook-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Recipe } from "@/types/recipe";
import { Input } from "./ui/input";
import { handleImageFileInput } from "@/lib/imageUtil";
import { Label } from "./ui/label";

export const ImageGallery: React.FC = () => {

  const form = useFormContext<Recipe>();

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "files",
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const data = await handleImageFileInput(e);
    const newFields = data.map((file, i) => ({ file: file.file, thumb: file.thumb, sort: i }))
    append(newFields)

  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Label htmlFor="gallery_field">
          Gallery
        </Label>
        <Input id="gallery_field" type="file" multiple accept="image/*" onChange={handleFileChange} />
      </div>
      <Carousel className="h-[150px] w-full">
        <CarouselContent>
          {fields.map((field) => (
            <CarouselItem key={field.id} className="basis-1/3 md:basis-[150px]">
              <img className="" src={`data:image/jpeg;base64,${field.thumb}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default ImageGallery;