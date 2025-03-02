import { Recipe } from "@/types/recipe"
import { Control, Controller, useFieldArray, UseFormRegister, useWatch } from "react-hook-form"
import { Input } from "./ui/input"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

interface Props {
  control: Control<Recipe>
  register: UseFormRegister<Recipe>
}

export const IngredientsFieldArray: React.FC<Props> = ({ control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "zutaten"
  })

  const test = useWatch({
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
                Head line
                <Controller
                  name={`zutaten.${index}.headline`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange} // Important: Uses `onCheckedChange`
                    />
                  )}
                />
              </Label>
              {test[index] && !test[index].headline && (
                <Input className="w-1/6" type="number" placeholder="Menge" {...register(`zutaten.${index}.menge`, { valueAsNumber: true })} />
              )}
              {test[index] && !test[index].headline && (
                <Input className="w-1/4" placeholder="Einheit" {...register(`zutaten.${index}.einheit`)} />
              )}
              <Input placeholder="Zutat" {...register(`zutaten.${index}.zutat`)} />
              <Button type="button" onClick={() => {
                remove(index)
              }}>
                <Trash />
              </Button>
            </div>
          </div>
        )))}
      <Button type="button" onClick={() => {
        append({ einheit: "", menge: 0, headline: false, sort: test.length + 1, zutat: "" }, { shouldFocus: false })
      }}>Add ingredients</Button><br />
    </div>
  )
}