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
  nut: z.object({
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
  }),
  // Ingredients
  zutaten: z.array(IngredientSchema),
  infos: z.object({
    pieces: z.number(),
    id: z.string(),
    notes: z.string(),
    name: z.string(),
    suchtext: z.string(),
    pieces_kind: z.string(),
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
    pieces: 5,
    id: generateId(),
    notes: 'Notes test',
    name: 'Test name',
    suchtext: 'Test',
    pieces_kind: 'Pieces',
  },
  tags: []
}

export const testRecipeValues: Recipe = {
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
    {
      "text_step": "This is how it is made",
      "headline": "Preparation stap 1",
      "sort": 1
    },
    {
      "text_step": "Next Step",
      "headline": "Step 2",
      "sort": 2
    }
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
  zutaten: [{
    "einheit": "szt",
    "menge": 1,
    "headline": true,
    "sort": 1,
    "zutat": "Jajko"
  },
  {
    "einheit": "szt",
    "menge": 5,
    "headline": false,
    "sort": 2,
    "zutat": "Masło"
  }],
  infos: {
    pieces: 5,
    id: generateId(),
    notes: 'Notes test',
    name: 'Test name',
    suchtext: 'Test',
    pieces_kind: 'Pieces',
  },
  tags: []
}