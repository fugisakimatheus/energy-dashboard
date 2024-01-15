import { NextUIProvider } from '@nextui-org/react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export function renderComponent(jsx: React.ReactElement) {
  global.CSS = {
    supports: (k: string, v: string) => false,
    escape: (v: string) => v,
  } as any

  return {
    user: userEvent.setup(),
    ...render(<NextUIProvider>{jsx}</NextUIProvider>),
  }
}
