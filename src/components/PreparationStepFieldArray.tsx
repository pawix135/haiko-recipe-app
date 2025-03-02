import { Recipe } from "@/types/recipe"
import { Control, useFieldArray, UseFormRegister } from "react-hook-form"
import { Input } from "./ui/input"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

interface Props {
  control: Control<Recipe>
  register: UseFormRegister<Recipe>
}

export const PreparationStepFieldArray: React.FC<Props> = ({ control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "zubreitung"
  })

  return (
    <div className="space-y-2">
      {fields.length > 0 && (
        fields.map((field, index) => (
          <div key={field.id} >
            <div className='flex flex-col gap-2'>
              <Input placeholder="Head line" {...register(`zubreitung.${index}.headline`)} />
              <Textarea placeholder="Step" {...register(`zubreitung.${index}.text_step`)} />
              <Button type="button" onClick={() => {
                remove(index)
              }}>
                <Trash />
              </Button>
            </div>
          </div>
        )))}
      <Button type="button" onClick={() => {
        append({ headline: "", sort: 0, text_step: "" }, { shouldFocus: false })
      }}>Add step</Button><br />
    </div>
  )
}