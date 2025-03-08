import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Recipe } from "../types/recipe"
import { RECIPE_INFOS_AMOUNT_LABEL, RECIPE_INFOS_AMOUNT_PLACEHOLDER, RECIPE_INFOS_NAME_LABEL, RECIPE_INFOS_NAME_PLACEHOLDER, RECIPE_THUMBNAIL_CALL_TO_ACTION, RECIPES_INFO_PIECES_KIND_PLACEHOLDER } from "../constants/text"
import { Label } from "./ui/label"
import { ThumbnailImage } from "./ThumbnailImage"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
}

export const RecipeInfos: React.FC<Props> = () => {

  const { control, register, ...form } = useFormContext<Recipe>();

  let formData = form.watch()

  const removeThumbnail = () => {
    form.setValue('thumb.nail', '');
  }

  return (
    <div className="flex flex-row space-y-4 h-[150px]">
      <div className='relative flex flex-row space-x-5'>
        {formData.thumb.nail ? (
          <div className="size-[150px]">
            <img src={"data:image/jpeg;base64," + formData.thumb.nail} alt="Vorschaubild" className="w-[150px] rounded-[10px]" />
            <Button type="button" variant={"destructive"} onClick={removeThumbnail} className="absolute right-0 bottom-0 z-10">
              <Trash />
            </Button>
          </div>
        ) :
          <Label htmlFor="thumbnail" className='flex flex-col size-[150px]'>
            <div className="border border-accent-foregroundt w-full h-[150px] relative grid place-items-center rounded-[10px]">
              <span className="text-center">{RECIPE_THUMBNAIL_CALL_TO_ACTION}</span>
            </div>
          </Label>
        }
        <ThumbnailImage />
      </div>
      <div className="w-full h-full space-y-2 flex flex-col justify-between">
        <FormField
          control={control}
          name="infos.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{RECIPE_INFOS_NAME_LABEL}* <FormMessage /></FormLabel>
              <FormControl>
                <Input placeholder={RECIPE_INFOS_NAME_PLACEHOLDER} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex flex-row space-x-2'>
          <FormField
            control={control}
            name="infos.pieces"
            render={({ field }) => (
              <FormItem className='w-half'>
                <FormLabel>{RECIPE_INFOS_AMOUNT_LABEL}* <FormMessage /></FormLabel>
                <FormControl>
                  <Input type='number' placeholder={RECIPE_INFOS_AMOUNT_PLACEHOLDER} {...register(field.name, { valueAsNumber: true })} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="infos.pieces_kind"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>&nbsp;<FormMessage /></FormLabel>
                <FormControl>
                  <Input placeholder={RECIPES_INFO_PIECES_KIND_PLACEHOLDER} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}