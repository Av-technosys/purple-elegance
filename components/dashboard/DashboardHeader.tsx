interface DashboardHeaderProps {
  title: string
  description: string
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 font-heading sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{description}</p>
    </header>
  )
}
