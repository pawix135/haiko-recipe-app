import { useForm } from 'react-hook-form'
import { defaultRecipeValues, Recipe, RecipeSchema } from './types/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { IngredientsFieldArray } from './components/IngredientsFieldArray'
import { Textarea } from './components/ui/textarea'
import { encodeRecipeData, openRecipeInApp, saveRecipeAsFile } from './lib/utils'
import { PreparationStepFieldArray } from './components/PreparationStepFieldArray'
import { useState } from 'react'
import QRCode from 'react-qr-code'

function App() {

  const [qrCode, setQrCode] = useState<string | null>(null);

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
    setQrCode("mrv://" + encodeRecipeData(values));
  }


  return (
    <>
      <div className='max-w-[800px] mx-auto p-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="infos.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cake with.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-row space-x-2'>
              <FormField
                control={form.control}
                name="infos.pieces"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Menge</FormLabel>
                    <FormControl>
                      <Input type='number' placeholder="Menge" {...form.register(field.name, { valueAsNumber: true })} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="infos.pieces_kind"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>&nbsp;</FormLabel>
                    <FormControl>
                      <Input placeholder="Liter / Portionen / Flaschen / usw." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <IngredientsFieldArray control={form.control} register={form.register} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Preparation steps</FormLabel>
              <FormControl>
                <PreparationStepFieldArray control={form.control} register={form.register} />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="infos.suchtext"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Zubereitung</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Zubereitung" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='space-x-2'>
              <Button type="submit">Download recipe</Button>
              <Button type="button" onClick={() => {
                form.handleSubmit(openInApp)();
              }}>Open in App</Button>
              <Button type="button" onClick={() => {
                form.handleSubmit(createQRCode)();
              }}>QR Code</Button>
            </div>
          </form>
        </Form>
        <br />
        {qrCode && <QRCode value={qrCode ?? ""} />}
      </div>
    </>
  )
}

export default App
