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
    message = 'Ops! Ocorreu um erro ao carregar as informações. Tente novamente em instantes.',
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
      data-testid="error-box"
      style={{ height }}
      className="mx-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-danger/30 bg-danger/10 px-8 backdrop-blur-sm"
    >
      <MdErrorOutline size={36} className="text-danger" />
      <span className="text-center text-sm font-medium text-danger-foreground sm:text-base">
        {message}
      </span>

      <Button
        radius="lg"
        variant="bordered"
        className="mt-1 border-danger/50 font-medium text-danger"
        onClick={() => handleRetry()}
      >
        Tentar novamente
      </Button>
    </div>
  )
}
