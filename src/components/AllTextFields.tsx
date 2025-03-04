import { Recipe } from "@/types/recipe"
import { Control } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Textarea } from "./ui/textarea"
import { TEXTAREA_NOTES_LABEL, TEXTAREA_NOTES_PLACEHOLDER } from "@/constants/text"

interface Props {
  control: Control<Recipe>
}

export const AllTextFields: React.FC<Props> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="infos.notes"
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>{TEXTAREA_NOTES_LABEL} <FormMessage /></FormLabel>
            <FormControl>
              <Textarea cols={50} placeholder={TEXTAREA_NOTES_PLACEHOLDER} {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}