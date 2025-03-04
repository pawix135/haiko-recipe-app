import { Recipe } from "@/types/recipe"
import { Control, Controller, useFieldArray, UseFormRegister, useWatch } from "react-hook-form"
import { Input } from "./ui/input"
import { Plus, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { INGREDIENT_ADD_BUTTON_TEXT, INGREDIENT_CHECKBOX_LABEL, INGREDIENT_INPUT_EINHEIT_PLACEHOLDER, INGREDIENT_INPUT_MENGE_PLACEHOLDER, INGREDIENT_INPUT_ZUTAT_PLACEHOLDER } from "@/constants/text"

interface Props {
  control: Control<Recipe>
  register: UseFormRegister<Recipe>
}

export const IngredientsFieldArray: React.FC<Props> = ({ control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "zutaten"
  })

  const watchedFields = useWatch({
    name: 'zutaten',
    control
  })

  return (
    <div className="space-y-2">
      {fields.length > 0 && (
        fields.map((field, index) => (
          <div key={field.id} >
            <div className='flex flex-row gap-2 items-center'>
              <Label className="flex flex-row w-1/3">
                {INGREDIENT_CHECKBOX_LABEL}
                <Controller
                  name={`zutaten.${index}.headline`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </Label>
              {watchedFields[index] && !watchedFields[index].headline && (
                <Input className="w-1/6" type="number" placeholder={INGREDIENT_INPUT_MENGE_PLACEHOLDER} {...register(`zutaten.${index}.menge`, { valueAsNumber: true })} />
              )}
              {watchedFields[index] && !watchedFields[index].headline && (
                <Input className="w-1/4" placeholder={INGREDIENT_INPUT_EINHEIT_PLACEHOLDER} {...register(`zutaten.${index}.einheit`)} />
              )}
              <Input placeholder={watchedFields[index]?.headline ? "Titel des Absatzes" : INGREDIENT_INPUT_ZUTAT_PLACEHOLDER} {...register(`zutaten.${index}.zutat`)} />
              <Button variant={"destructive"} type="button" onClick={() => {
                remove(index)
              }}>
                <Trash />
              </Button>
            </div>
          </div>
        )))}
      <Button variant={"heiko"} type="button" onClick={() => {
        append({ einheit: "", menge: 0, headline: false, sort: watchedFields.length + 1, zutat: "" }, { shouldFocus: false })
      }}><Plus />{INGREDIENT_ADD_BUTTON_TEXT}</Button>
    </div>
  )
}