import { Recipe } from "@/types/recipe"
import { useState } from "react";
import { useFormContext } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { NutritionFields } from "./NutritionFields";
import { Button } from "./ui/button";
import { NUTRITION_BUTTON_TEXT } from "@/constants/text";

interface Props { }

export const NutritionDialog: React.FC<Props> = () => {

  const [showNutritionDialog, setShowNutritionDialog] = useState<boolean>(false);
  const { watch, control } = useFormContext<Recipe>()

  let formWatchValues = watch()

  return (
    <>
      <Button variant={"heiko"} type="button" onClick={() => {
        setShowNutritionDialog(true)
      }}>{NUTRITION_BUTTON_TEXT}</Button>
      <Dialog open={showNutritionDialog} onOpenChange={setShowNutritionDialog}>
        <DialogContent className='flex flex-col items-center' aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Nährwerttabelle</DialogTitle>
          </DialogHeader>
          <NutritionFields control={control} amount={formWatchValues.infos.pieces} pieces_kind={formWatchValues.infos.pieces_kind} />
        </DialogContent>
      </Dialog>
    </>
  )
}