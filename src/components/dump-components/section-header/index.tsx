type SectionHeaderProps = {
  title: string
  description?: string
}

export default function SectionHeader(props: SectionHeaderProps) {
  const { title, description } = props

  return (
    <div className="mb-5 flex flex-col gap-1">
      <h2 className="text-base font-semibold text-foreground sm:text-lg">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
