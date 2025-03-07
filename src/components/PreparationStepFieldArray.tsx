import { Recipe } from "@/types/recipe"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { Input } from "./ui/input"
import { Plus, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ADD_STEP_BUTTON_TEXT, STEP_HEADLINE_FIRST_DEFAULT_TEXT, STEP_HEADLINE_INPUT_PLACEHOLDER, STEP_HEADLINE_NEXT_DEFAULT_TEXT, STEP_TEXTAREA_PLACEHOLDER } from "@/constants/text"

interface Props {
}

export const PreparationStepFieldArray: React.FC<Props> = () => {

  const { control, register } = useFormContext<Recipe>();
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
      <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-2 space-y-2 gap-3">
        {fields.length > 0 && (
          fields.map((field, index) => (
            <div key={field.id} >
              <div className='flex flex-col gap-2'>
                <div className="flex flex-row space-x-2 w-full">
                  <Input placeholder={STEP_HEADLINE_INPUT_PLACEHOLDER} {...register(`zubreitung.${index}.headline`)} />
                  <Button variant={"destructive"} type="button" onClick={() => removeStep(index)}>
                    <Trash />
                  </Button>
                </div>
                <Textarea placeholder={STEP_TEXTAREA_PLACEHOLDER} {...register(`zubreitung.${index}.text_step`)} />

              </div>
            </div>
          )))}
      </div>
      <Button id="add_step" variant={"heiko"} className="w-1/3" type="button" onClick={() => {
        let text_step = "";
        if (zubreitungWatch.length <= 0) text_step = STEP_HEADLINE_FIRST_DEFAULT_TEXT
        else text_step = `${STEP_HEADLINE_NEXT_DEFAULT_TEXT} ${(zubreitungWatch.length + 1)}`
        append({ headline: text_step, sort: zubreitungWatch.length + 1, text_step: "" }, { shouldFocus: false })
      }}><Plus />{ADD_STEP_BUTTON_TEXT}</Button>
    </>
  )
}