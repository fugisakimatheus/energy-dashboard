'use client'

type CardProps = {
  children: React.ReactNode
  fitContent?: boolean
}

export default function Card(props: CardProps) {
  const { children, fitContent = false } = props
  const fitClass = fitContent ? 'h-auto w-full' : 'h-full w-full'

  return (
    <div className={`${fitClass} glass-card overflow-hidden px-5 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-7`}>
      {children}
    </div>
  )
}
