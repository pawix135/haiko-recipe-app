import { useForm } from 'react-hook-form'
import { defaultRecipeValues, Recipe, RecipeSchema } from './types/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormItem, FormLabel } from './components/ui/form'
import { Button } from './components/ui/button'
import { IngredientsFieldArray } from './components/IngredientsFieldArray'
import { createOpenInAppLink, encodeRecipeData, openRecipeInApp, saveRecipeAsFile } from './lib/utils'
import { PreparationStepFieldArray } from './components/PreparationStepFieldArray'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { RecipeInfos } from './components/RecipeInfos'
import { AllTextFields } from './components/AllTextFields'
import { DOWNLOAD_RECIPE_BUTTON_TEXT, FORM_RESET_BUTTON, INGREDIENTS_LABEL, NUTRITION_BUTTON_TEXT, OPEN_IN_APP_BUTTON_TEXT, PREPARATION_STEP_LABEL, QR_CODE_BUTTON_TEXT, QR_CODE_DIALOG_TITLE } from './constants/text'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog'
import { VegField } from './components/VegField'
import { NutritionFields } from './components/NutritionFields'

function App() {

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showNutritionDialog, setShowNutritionDialog] = useState<boolean>(false);

  const form = useForm<Recipe>({
    defaultValues: defaultRecipeValues,
    resolver: zodResolver(RecipeSchema),
  })

  const onSubmit = (values: Recipe) => {
    saveRecipeAsFile(values);
  }

  const openInApp = (values: Recipe) => {
    openRecipeInApp(values);
  }

  const createQRCode = (values: Recipe) => {
    setQrCode(createOpenInAppLink(encodeRecipeData(values)));
  }

  let formWatchValues = form.watch()

  return (
    <>
      <div className='container mx-auto p-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <RecipeInfos control={form.control} register={form.register} />
            <VegField control={form.control} />
            <FormItem>
              <FormLabel>{INGREDIENTS_LABEL}</FormLabel>
              <FormControl>
                <IngredientsFieldArray control={form.control} register={form.register} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>{PREPARATION_STEP_LABEL}</FormLabel>
              <FormControl>
                <PreparationStepFieldArray control={form.control} register={form.register} />
              </FormControl>
            </FormItem>
            <Button variant={"heiko"} type="button" onClick={() => {
              setShowNutritionDialog(true)
            }}>{NUTRITION_BUTTON_TEXT}</Button>
            <AllTextFields control={form.control} />
            <div className='flex flex-row flex-wrap space-x-2 space-y-2'>
              <Button variant={"heiko"} type="submit">{DOWNLOAD_RECIPE_BUTTON_TEXT}</Button>
              <Button variant={"heiko"} type="button" onClick={() => form.handleSubmit(openInApp)()}>{OPEN_IN_APP_BUTTON_TEXT}</Button>
              <Button variant={"heiko"} type="button" onClick={() => form.handleSubmit(createQRCode)()}>{QR_CODE_BUTTON_TEXT}</Button>
              <Button type="button" className='md:ml-auto bg-gray-500' onClick={() => form.reset()}>{FORM_RESET_BUTTON}</Button>
            </div>
          </form>
          <Dialog open={showNutritionDialog} onOpenChange={setShowNutritionDialog}>
            <DialogContent className='flex flex-col items-center' aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle>Nährwerttabelle</DialogTitle>
              </DialogHeader>
              <NutritionFields control={form.control} amount={formWatchValues.infos.pieces} pieces_kind={formWatchValues.infos.pieces_kind} />
            </DialogContent>
          </Dialog>
        </Form>
        <Dialog open={qrCode !== null} onOpenChange={() => setQrCode(null)}>
          <DialogContent className='flex flex-col items-center'>
            <DialogHeader>
              <DialogTitle>{QR_CODE_DIALOG_TITLE}</DialogTitle>
            </DialogHeader>
            {qrCode && <QRCode className='mt-5' value={qrCode ?? ""} />}
          </DialogContent>
        </Dialog>
      </div>

    </>
  )
}

export default App
