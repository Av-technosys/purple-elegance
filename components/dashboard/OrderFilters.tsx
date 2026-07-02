"use client"

const filters = ["All", "In Transit", "Delivered", "Cancelled"]

interface OrderFiltersProps {
  selected: string
  onChange: (filter: string) => void
}

export function OrderFilters({ selected, onChange }: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = selected === filter
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-[#2A0C00] text-white"
                : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
            }`}
          >
            {filter}
          </button>
        )
      })}
    </div>
  )
}
