import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Recipe } from "../types/recipe"
import { RECIPE_INFOS_AMOUNT_LABEL, RECIPE_INFOS_AMOUNT_PLACEHOLDER, RECIPE_INFOS_NAME_LABEL, RECIPE_INFOS_NAME_PLACEHOLDER, RECIPES_INFO_PIECES_KIND_PLACEHOLDER } from "../constants/text"
import { Label } from "./ui/label"
import { ThumbnailImage } from "./ThumbnailImage"
import { VegField } from "./VegField"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
}

export const RecipeInfos: React.FC<Props> = () => {

  const { control, register, ...form } = useFormContext<Recipe>();

  let formData = form.watch()

  return (
    <div className="flex flex-row space-y-4 h-[150px]">
      <div className='flex flex-row space-x-2'>
        <Label htmlFor="thumbnail" className='flex flex-col'>
          {formData.thumb.nail ? (
            <div className="relative w-[150px] h-auto">
              <img src={formData.thumb.nail} alt="Vorschaubild" className="w-[150px] rounded-[5px]" />
              <Button variant={"destructive"} className="absolute right-0 bottom-0">
                <Trash />
              </Button>
            </div>
          ) :
            <div className="border border-red-500 size-[150px] relative grid place-items-center rounded-[5px]">
              <span className="text-center">Click here to choose thumbnail</span>
            </div>
          }
        </Label>
        <ThumbnailImage />
      </div>
      <div className="w-full h-full space-y-2 flex flex-col justify-around">
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
              <FormItem className='w-full'>
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