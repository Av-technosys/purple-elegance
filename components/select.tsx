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
  className?: string
}

export function Select({
  placeholder = "Select…",
  label,
  selectItems,
  value,
  onValueChange,
  disabled,
  className,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[9rem]">
      {label && (
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      )}
      <ShadSelect value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="h-10 border-slate-200 shadow-xs focus:ring-violet-600/15 focus:border-violet-600 rounded-lg min-w-[10rem] bg-white text-slate-700 font-medium text-sm transition-all">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
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
