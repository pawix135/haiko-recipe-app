import { FormProvider, useForm } from 'react-hook-form'
import { defaultRecipeValues, Recipe, RecipeSchema } from './types/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormItem, FormLabel } from './components/ui/form'
import { Button } from './components/ui/button'
import { IngredientsFieldArray } from './components/IngredientsFieldArray'
import { createOpenInAppLink, encodeRecipeData, openRecipeInApp, saveRecipeAsFile } from './lib/utils'
import { PreparationStepFieldArray } from './components/PreparationStepFieldArray'
import { useEffect, useState } from 'react'
import { RecipeInfos } from './components/RecipeInfos'
import { AllTextFields } from './components/AllTextFields'
import { DOWNLOAD_RECIPE_BUTTON_TEXT, FORM_RESET_BUTTON, INGREDIENTS_LABEL, OPEN_IN_APP_BUTTON_TEXT, PREPARATION_STEP_LABEL, QR_CODE_BUTTON_TEXT } from './constants/text'
import { VegField } from './components/VegField'
import { NutritionDialog } from './components/NutritionDialog'
import { useLocalStorage } from './hooks/useLocalStorage'
import { RecipeQRCode } from './components/RecipeQRCode'
import { ImportRecipe } from './components/ImportRecipe'
import { MoreInformationsFields } from './components/MoreInformationsFields'

function App() {

  const [qrCode, setQrCode] = useState<string | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [storage, setStorage] = useLocalStorage("recipe", defaultRecipeValues);

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

  const resetForm = () => {
    const response = confirm("Are you sure you want to reset the form?");

    if (response) {
      form.reset(defaultRecipeValues)
      localStorage.removeItem("recipe");
    }
  }

  let formData = form.watch();

  useEffect(() => {
    if (!loaded) {
      form.reset(storage);
      setLoaded(true);
    }
  }, [storage, form.reset, loaded]);

  const onChange = () => {
    setStorage(formData);
  };

  // FIXME: THIS IS A BAD WAY TO CALCULATE THE SIZE OF THE OBJECT, THIS THROWS! DANG!
  const recipeObjectSize = JSON.stringify(formData, null, 0).length;

  return (
    <div className='container mx-auto p-2'>
      <pre>
        {JSON.stringify(formData.info, null, 2)}
      </pre>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={onChange} className="space-y-5">
          <RecipeInfos />
          <VegField />
          <FormItem>
            <FormLabel htmlFor={"add_ingredient"}>{INGREDIENTS_LABEL}</FormLabel>
            <FormControl>
              <IngredientsFieldArray />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor='add_step'>{PREPARATION_STEP_LABEL}</FormLabel>
            <FormControl>
              <PreparationStepFieldArray />
            </FormControl>
          </FormItem>
          <div className='space-x-2'>
            <NutritionDialog />
            <MoreInformationsFields />
          </div>
          <AllTextFields />
          <div className='flex flex-row flex-wrap space-x-2 space-y-2'>
            <Button variant={"heiko"} type="submit">{DOWNLOAD_RECIPE_BUTTON_TEXT}</Button>
            <Button variant={"heiko"} type="button" onClick={() => form.handleSubmit(openInApp)()}>{OPEN_IN_APP_BUTTON_TEXT}</Button>
            {recipeObjectSize < 1500 && <Button variant={"heiko"} type="button" onClick={() => form.handleSubmit(createQRCode)()}>{QR_CODE_BUTTON_TEXT}</Button>}
            <Button type="button" className='md:ml-auto bg-gray-500' onClick={resetForm}>{FORM_RESET_BUTTON}</Button>
          </div>
          <ImportRecipe />
        </form>
      </FormProvider>
      <RecipeQRCode qrCode={qrCode} setQrCode={setQrCode} />
    </div>
  )
}

export default App
