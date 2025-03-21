import { useFieldArray, useFormContext } from "react-hook-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Recipe } from "@/types/recipe";
import { Input } from "./ui/input";
import { handleImageFileInput } from "@/lib/imageUtil";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { MoveLeft, MoveRight, Plus, Trash } from "lucide-react";
import { IMAGE_GALLERY_LABEL } from "@/constants/text";
import { useDropzone } from 'react-dropzone'
import { useRef } from "react";

export const ImageGallery: React.FC = () => {

  const form = useFormContext<Recipe>();
  const importImageInputRef = useRef<HTMLInputElement>(null);
  const { fields, append, remove, swap } = useFieldArray({
    control: form.control,
    name: "files",
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await handleImageFileInput(e.currentTarget.files, undefined, 1200);
    const newFields = data.map((file, i) => ({ file: file.file, thumb: file.thumb, sort: i }))
    append(newFields)

  }

  const openImportGallery = () => {
    importImageInputRef.current?.click();
  }

  const removeImage = (index: number) => {
    remove(index);
  }

  const moveImage = (index: number, direction: "left" | "right") => {
    if (direction === "left") {
      swap(index, index - 1);
    } else {
      swap(index, index + 1);
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const newImages = await handleImageFileInput(acceptedFiles);
    console.log(newImages);

    const newFields = newImages.map((file, i) => ({ file: file.file, thumb: file.thumb, sort: i }))
    append(newFields)
  };


  const { getRootProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="flex flex-col">
      <div className="space-y-2">
        <Label htmlFor="gallery_field">
          {IMAGE_GALLERY_LABEL}
          <span className="font-normal text-xs">(Du kannst Drag und Drop verwenden um Bilder hinzuzufügen.)</span>
        </Label>
        <Input ref={importImageInputRef} id="gallery_field" type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
        {/* <input {...getInputProps()} /> */}
      </div>
      <Carousel className="h-[150px] w-full">
        <CarouselContent         {...getRootProps()} className="relative ml-1 py-2">
          {fields.map((field, index) => (
            <CarouselItem key={field.id} className="pl-0 mr-2 relative md:basis-[150px] ">
              <div className="!w-full">
                <img className="!w-full !h-[150px] rounded-[10px]" src={`data:image/jpeg;base64,${field.thumb}`} />
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => removeImage(index)}
                  className="absolute right-0 bottom-0 z-10"
                >
                  <Trash />
                </Button>
                <div className="absolute top-0 right-0 flex flex-row w-full justify-between">
                  {index != 0 && <Button type="button" size={"sm"} variant={"heiko"} onClick={() => moveImage(index, "left")}><MoveLeft /></Button>}
                  {index != fields.length - 1 && <Button type="button" size={"sm"} variant={"heiko"} onClick={() => moveImage(index, "right")}><MoveRight /></Button>}
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem>
            <Button type="button" className="size-[150px] z-20" variant={"outline"} onClick={openImportGallery}>
              <Plus />
            </Button>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

export default ImageGallery;