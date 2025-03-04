import { Recipe } from "@/types/recipe"
import { Control, Controller } from "react-hook-form"
import { Label } from './ui/label'
import { Checkbox } from "./ui/checkbox"
import { VEG_FIELD_VEGAN_LABEL, VEG_FIELD_VEGETARIAN_LABEL } from "@/constants/text"

interface Props {
  control: Control<Recipe>
}

export const VegField: React.FC<Props> = ({ control }) => {

  return (
    <Controller
      control={control}
      name="infos.vegi_type"
      render={({ field }) => (
        <div className="flex flex-row gap-5">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={"vegi1"}
              className="cursor-pointer"
              checked={field.value === 1}
              onCheckedChange={(val) => field.onChange(val ? 1 : 0)}
            />
            <Label htmlFor="vegi1" className="cursor-pointer">{VEG_FIELD_VEGETARIAN_LABEL}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={"vegi2"}
              className="cursor-pointer"
              checked={field.value === 2}
              onCheckedChange={(val) => field.onChange(val ? 2 : 0)}
            />
            <Label htmlFor={"vegi2"} className="cursor-pointer">{VEG_FIELD_VEGAN_LABEL}</Label>
          </div>
        </div>
      )
      }
    />

  )
}