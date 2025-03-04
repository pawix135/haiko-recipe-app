import { generateId } from '@/lib/utils'
import { z } from 'zod'

export const PreparationStepSchema = z.object({
  text_step: z.string(),
  headline: z.string(),
  sort: z.number()
})

export type PreparationStep = z.infer<typeof PreparationStepSchema>

export const IngredientSchema = z.object({
  headline: z.boolean(),
  //Amount
  menge: z.number(),
  sort: z.number(),
  //Ingredient
  zutat: z.string(),
  //Unit
  einheit: z.string()
})

export type Ingredient = z.infer<typeof IngredientSchema>

export const NutSchema = z.object({
  salz: z.string(),
  eiweiss: z.string(),
  eiweiss100: z.string(),
  energie100: z.string(),
  kohlenhydrate: z.string(),
  fettsauren100: z.string(),
  salz100: z.string(),
  fett: z.string(),
  balaststoffe: z.string(),
  fettsauren: z.string(),
  balaststoffe100: z.string(),
  fett100: z.string(),
  zucker100: z.string(),
  zucker: z.string(),
  energie: z.string(),
  kohlenhydrate100: z.string(),
})

export type Nut = z.infer<typeof NutSchema>
export type NutKey = keyof Nut

export const RecipeSchema = z.object({
  files: z.array(z.unknown()),
  thumb: z.object({
    nail: z.string()
  }),
  // Preparation steps
  zubreitung: z.array(PreparationStepSchema),
  kat: z.array(z.object({
    name: z.string(),
    cat_id: z.string()
  })),
  nut: NutSchema,
  // Ingredients
  zutaten: z.array(IngredientSchema),
  infos: z.object({
    pieces: z.number().min(1, "Die Zahl muss größer oder gleich 1 sein."),
    id: z.string(),
    notes: z.string(),
    name: z.string().min(1, "Die Zeichenfolge muss mindestens 1 Zeichen enthalten."),
    suchtext: z.string(),
    pieces_kind: z.string().min(1, "Die Zeichenfolge muss mindestens 1 Zeichen enthalten."),
    vegi_type: z.number()
  }),
  tags: z.array(z.unknown()),
  info: z.object({
    rating: z.number(),
    level: z.number(),
    ruhezeit: z.number(),
    gesammtzeit: z.number(),
    link: z.string(),
    zubereitungszeit: z.number(),
    vorbreitungszeit: z.number(),
  })
})

export type Recipe = z.infer<typeof RecipeSchema>

export const defaultRecipeValues: Recipe = {
  files: [],
  thumb: {
    nail: ''
  },
  info: {
    rating: 0,
    level: 0,
    ruhezeit: 0,
    gesammtzeit: 0,
    link: '',
    zubereitungszeit: 0,
    vorbreitungszeit: 0,
  },
  zubreitung: [
  ],
  kat: [],
  nut: {
    salz: '',
    eiweiss: '',
    eiweiss100: '',
    energie100: '',
    kohlenhydrate: '',
    fettsauren100: '',
    salz100: '',
    fett: '',
    balaststoffe: '',
    fettsauren: '',
    balaststoffe100: '',
    fett100: '',
    zucker100: '',
    zucker: '',
    energie: '',
    kohlenhydrate100: '',
  },
  zutaten: [],
  infos: {
    pieces: 0,
    id: generateId(),
    notes: '',
    name: '',
    suchtext: '',
    pieces_kind: '',
    vegi_type: 0,
  },
  tags: []
}