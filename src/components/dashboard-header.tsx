import ThemeToggle from '@/components/theme-toggle'

export default function DashboardHeader() {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-lg"
            aria-hidden
          >
            ⚡
          </span>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Dashboard
          </h1>
        </div>
        <p className="pl-11 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          Informações baseadas nos dados de medições colhidos na CCEE.
        </p>
      </div>
      <ThemeToggle />
    </header>
  )
}
