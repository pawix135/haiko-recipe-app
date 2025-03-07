import { Recipe } from "@/types/recipe"
import { Control, RegisterOptions } from "react-hook-form"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

interface Props {
  control: Control<Recipe>
  pieces_kind: string
  amount: number
}

export const NutritionFields: React.FC<Props> = ({ control, amount, pieces_kind }) => {

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-4">
        <p className="col-span-2 "></p>
        <p>per 100g</p>
        {amount != 0 && pieces_kind != "" && (

          <p>{amount} {pieces_kind}</p>
        )}
      </div>
      <NutritionField control={control} name="nut.energie" label="Energie" ntype="kcal" />
      <NutritionField control={control} name="nut.fett" label="Fett" ntype="g" />
      <NutritionField control={control} name="nut.fettsauren" label="- davon gesättigte Fettsäuren" smaller ntype="g" />
      <NutritionField control={control} name="nut.kohlenhydrate" label="Kohlenhydrate" ntype="g" />
      <NutritionField control={control} name="nut.zucker" label="- davon Zucker" smaller ntype="g" />
      <NutritionField control={control} name="nut.eiweiss" label="Eiweiss" ntype="g" />
      <NutritionField control={control} name="nut.balaststoffe" label="Balaststoffe" ntype="g" />
      <NutritionField control={control} name="nut.salz" label="Salz" ntype="g" />
    </div>
  )
}

interface FieldProps {
  control: Control<Recipe>
  name: RegisterOptions<Recipe>['deps'],
  ntype: string;
  label: string
  smaller?: boolean
}

const NutritionField: React.FC<FieldProps> = ({ control, label, name, ntype, smaller }) => {
  return (
    <div className="grid grid-cols-7 gap-5">
      <p className={cn("col-span-3", { "text-[13px]": smaller })}>{label}</p>
      <div className="flex flex-row justify-start items-center col-span-2">
        <Input type="number" id={name + "100" as string} {...control.register(name + "100" as any)} />
        <span>{ntype}</span>
      </div>
      <div className="flex flex-row items-center col-span-2">
        <Input type="number" id={name as string} {...control.register(name as any)} />
        <span>{ntype}</span>
      </div>
    </div>
  )
}
