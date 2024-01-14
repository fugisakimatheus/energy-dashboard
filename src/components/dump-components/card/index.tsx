'use client'

type CardProps = {
  children: React.ReactNode
  fitContent?: boolean
}

export default function Card(props: CardProps) {
  const { children, fitContent = false } = props
  const fitClass = fitContent ? 'w-full h-fit' : 'w-full h-full'
  return (
    <div
      className={`${fitClass} px-4 pt-8 pb-8 bg-white shadow-sm border border-gray-200 rounded-lg`}
    >
      {children}
    </div>
  )
}
