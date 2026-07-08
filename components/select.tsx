"use client"

import {
  Select as ShadSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type SelectOption = {
  value: string
  label: string
}

interface SelectProps {
  placeholder?: string
  label?: string
  selectItems: SelectOption[]
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
}

export function Select({
  placeholder = "Select…",
  label,
  selectItems,
  value,
  onValueChange,
  disabled,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      )}
      <ShadSelect value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="min-w-36">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {/* Allow clearing the selection */}
          <SelectItem value="__all__">All</SelectItem>
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>
    </div>
  )
}
