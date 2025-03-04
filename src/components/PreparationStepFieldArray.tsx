import { Recipe } from "@/types/recipe"
import { Control, useFieldArray, UseFormRegister, useWatch } from "react-hook-form"
import { Input } from "./ui/input"
import { Plus, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ADD_STEP_BUTTON_TEXT, STEP_HEADLINE_FIRST_DEFAULT_TEXT, STEP_HEADLINE_INPUT_PLACEHOLDER, STEP_HEADLINE_NEXT_DEFAULT_TEXT, STEP_TEXTAREA_PLACEHOLDER } from "@/constants/text"

interface Props {
  control: Control<Recipe>
  register: UseFormRegister<Recipe>
}

export const PreparationStepFieldArray: React.FC<Props> = ({ control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "zubreitung"
  })

  const zubreitungWatch = useWatch({
    control,
    name: "zubreitung"
  })

  const removeStep = (index: number) => {
    remove(index)
  }

  return (
    <>
      <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 space-y-2 gap-3">
        {fields.length > 0 && (
          fields.map((field, index) => (
            <div key={field.id} >
              <div className='flex flex-col gap-2'>
                <Input placeholder={STEP_HEADLINE_INPUT_PLACEHOLDER} {...register(`zubreitung.${index}.headline`)} />
                <Textarea placeholder={STEP_TEXTAREA_PLACEHOLDER} {...register(`zubreitung.${index}.text_step`)} />
                <Button variant={"destructive"} type="button" onClick={() => removeStep(index)}>
                  <Trash />
                </Button>
              </div>
            </div>
          )))}
      </div>
      <Button variant={"heiko"} className="w-1/3" type="button" onClick={() => {
        let text_step = "";
        if (zubreitungWatch.length <= 0) text_step = STEP_HEADLINE_FIRST_DEFAULT_TEXT
        else text_step = `${STEP_HEADLINE_NEXT_DEFAULT_TEXT} ${(zubreitungWatch.length + 1)}`
        append({ headline: text_step, sort: zubreitungWatch.length + 1, text_step: "" }, { shouldFocus: false })
      }}><Plus />{ADD_STEP_BUTTON_TEXT}</Button>
    </>
  )
}