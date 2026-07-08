"use client"

import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getCategories } from "@/helper/category/action"

type CategoryOption = {
  id: string
  name: string
  slug: string
}

interface MultiCategorySelectProps {
  selectedCategories: string[] // array of category IDs
  onCategoriesChange: (ids: string[]) => void
}

export function MultiCategorySelect({
  selectedCategories,
  onCategoriesChange,
}: MultiCategorySelectProps) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<CategoryOption[]>([])

  useEffect(() => {
    getCategories().then(setOptions)
  }, [])

  function toggle(id: string) {
    if (selectedCategories.includes(id)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== id))
    } else {
      onCategoriesChange([...selectedCategories, id])
    }
  }

  const selected = options.filter((o) => selectedCategories.includes(o.id))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {selected.length === 0
              ? "Select categories…"
              : selected.map((c) => c.name).join(", ")}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput placeholder="Search categories…" />
          <CommandEmpty>No categories found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const isSelected = selectedCategories.includes(option.id)
              return (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => toggle(option.id)}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      isSelected ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.name}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selected.map((c) => (
            <Badge
              key={c.id}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => toggle(c.id)}
            >
              {c.name} ×
            </Badge>
          ))}
        </div>
      )}
    </Popover>
  )
}
