'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { MdErrorOutline } from 'react-icons/md'

type ErrorBoxProps = {
  height: string | number
  message?: string
  onRetry?: () => void
}

export default function ErrorBox(props: ErrorBoxProps) {
  const router = useRouter()

  const {
    message = 'Ops! ocorreu um erro ao carregar as informações, tente novamente em instantes.',
    height,
    onRetry,
  } = props

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
      return
    }
    router.refresh()
  }

  return (
    <div
      style={{ height }}
      className="bg-red-50 flex flex-col items-center justify-center gap-2 mx-4 rounded-md px-8"
    >
      <MdErrorOutline size={32} className="text-red-700" />
      <span className="text-center text-red-700 font-medium">{message}</span>

      <Button
        radius="sm"
        color="danger"
        variant="bordered"
        className="mt-2 border border-red-700 text-red-700 font-medium"
        onClick={() => handleRetry()}
      >
        Tentar novamente
      </Button>
    </div>
  )
}
