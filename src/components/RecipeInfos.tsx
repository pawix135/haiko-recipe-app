import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Recipe } from "../types/recipe"
import { RECIPE_INFOS_AMOUNT_LABEL, RECIPE_INFOS_AMOUNT_PLACEHOLDER, RECIPE_INFOS_NAME_LABEL, RECIPE_INFOS_NAME_PLACEHOLDER, RECIPES_INFO_PIECES_KIND_PLACEHOLDER } from "../constants/text"

interface Props {
}

export const RecipeInfos: React.FC<Props> = () => {

  const { control, register } = useFormContext<Recipe>();

  return (
    <>
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
    </>
  )
}