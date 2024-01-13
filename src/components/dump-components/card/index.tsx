'use client'

type CardProps = {
  children: React.ReactNode
}

export default function Card({ children }: CardProps) {
  return (
    <div className="w-full h-full px-4 pt-8 pb-8 bg-white shadow-sm border border-gray-200 rounded-lg">
      {children}
    </div>
  )
}
