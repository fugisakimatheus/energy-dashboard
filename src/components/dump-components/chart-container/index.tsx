type ChartContainerProps = {
  children: React.ReactNode
  height?: number
  className?: string
}

export default function ChartContainer(props: ChartContainerProps) {
  const { children, height = 320, className = '' } = props

  return (
    <div
      className={`w-full px-1 sm:px-2 ${className}`}
      style={{ height, minHeight: height }}
    >
      {children}
    </div>
  )
}
