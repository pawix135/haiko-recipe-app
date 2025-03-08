import { Recipe } from "@/types/recipe"
import { useFormContext } from "react-hook-form"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { Label } from "./ui/label"
import { Star } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export const MoreInformationsFields: React.FC = () => {

  const form = useFormContext<Recipe>()

  const handleDifficultyChange = (value: string) => {
    form.setValue("info.level", Number(value));
  }

  const handleRatingChange = (value: string) => {
    form.setValue("info.rating", Number(value) ?? 0);
  }

  const infoWatch = form.watch().info;

  useEffect(() => {

    let value = infoWatch.vorbreitungszeit + infoWatch.zubereitungszeit + infoWatch.ruhezeit

    form.setValue("info.gesammtzeit", value ?? 0);

  }, [infoWatch.vorbreitungszeit, infoWatch.zubereitungszeit, infoWatch.ruhezeit])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={"heiko"}>Weitere Infos hinzufügen</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Weitere Infos</DialogTitle>
        <>
          <div className="flex flex-row justify-between gap-5">
            <Label htmlFor="difficulty">Schwierigkeit</Label>
            <ToggleGroup type="single" value={String(infoWatch.level)} onValueChange={handleDifficultyChange}>
              <ToggleGroupItem id="difficulty" value="0">Leicht</ToggleGroupItem>
              <ToggleGroupItem id="difficulty" value="1">Mittel</ToggleGroupItem>
              <ToggleGroupItem id="difficulty" value="2">Schwer</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <Label htmlFor="rating-1">Bewertung</Label>
            <ToggleGroup type="single" value={String(infoWatch.rating)} onValueChange={handleRatingChange}>
              <ToggleGroupItem id="rating-1" value="1"><Star className={cn("fill-white stroke-gray-500", {
                "fill-heiko stroke-heiko": infoWatch.rating >= 1,
              })} /></ToggleGroupItem>
              <ToggleGroupItem id="rating-2" value="2"><Star className={cn("fill-white stroke-gray-500", {
                "fill-heiko stroke-heiko": infoWatch.rating >= 2,
              })} /></ToggleGroupItem>
              <ToggleGroupItem id="rating-3" value="3"><Star className={cn("fill-white stroke-gray-500", {
                "fill-heiko stroke-heiko": infoWatch.rating >= 3,
              })} /></ToggleGroupItem>
              <ToggleGroupItem id="rating-4" value="4"><Star className={cn("fill-white stroke-gray-500", {
                "fill-heiko stroke-heiko": infoWatch.rating >= 4,
              })} /></ToggleGroupItem>
              <ToggleGroupItem id="rating-5" value="5"><Star className={cn("fill-white stroke-gray-500", {
                "fill-heiko stroke-heiko": infoWatch.rating == 5,
              })} /></ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col gap-1 ">
            <div className="flex flex-row items-center gap-3">
              <Label htmlFor="vorbereitungszeit">Vorbereitungszeit</Label>
              <div className="flex justify-end items-center gap-2 ml-auto">
                <Input id="vorbereitungszeit" type="number" min={0} className="w-[100px]" {...form.register("info.vorbreitungszeit", { valueAsNumber: true })} />
                <span>Min.</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Label htmlFor="zubereitungszeit">Zubereitungszeit</Label>
              <div className="flex justify-end items-center gap-2 ml-auto">
                <Input id="zubereitungszeit" type="number" min={0} className="w-[100px]" {...form.register("info.zubereitungszeit", { valueAsNumber: true })} />
                <span>Min.</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Label htmlFor="ruhezeit">Ruhezeit</Label>
              <div className="flex justify-end items-center gap-2 ml-auto">
                <Input id="ruhezeit" type="number" min={0} className="w-[100px]" {...form.register("info.ruhezeit", { valueAsNumber: true })} />
                <span>Min.</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex flex-row items-center gap-3 ">
            <Label htmlFor="gesamtzeit">Gesamtzeit</Label>
            <div className="flex justify-end items-center gap-2 ml-auto">
              <Input value={infoWatch.gesammtzeit ?? 0} readOnly disabled id="gesamtzeit" type="number" className="w-[100px]" />
              <span>Min.</span>
            </div>
          </div>
        </>
      </DialogContent>

    </Dialog>
  )
}
