import { fireEvent, render, screen } from '@testing-library/react'
import * as useRouter from 'next/navigation'
import ErrorBox from '..'

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }))

describe('ErrorBox', () => {
  const refreshMock = jest.fn()
  const mockUseRouter = jest.fn(() => ({ refresh: refreshMock }))

  jest.spyOn(useRouter, 'useRouter').mockImplementation(mockUseRouter as any)

  it('should renders ErrorBox component with default message', () => {
    render(<ErrorBox height={100} />)
    const errorMessage = screen.getByText(
      /Ops! ocorreu um erro ao carregar as informações/i,
    )
    expect(errorMessage).toBeTruthy()
  })

  it('should renders ErrorBox component with custom message', () => {
    render(<ErrorBox height={100} message="Custom error message" />)
    const errorMessage = screen.getByText(/Custom error message/i)
    expect(errorMessage).toBeTruthy()
  })

  it('should calls onRetry when retry button is clicked', () => {
    const mockOnRetry = jest.fn()
    render(<ErrorBox height={100} onRetry={mockOnRetry} />)
    const retryButton = screen.getByText(/Tentar novamente/i)
    fireEvent.click(retryButton)
    expect(mockOnRetry).toHaveBeenCalled()
  })

  it('should calls router.refresh when onRetry is not provided', () => {
    render(<ErrorBox height={100} />)
    const retryButton = screen.getByText(/Tentar novamente/i)
    fireEvent.click(retryButton)

    expect(refreshMock).toHaveBeenCalled()
  })

  it('should renders ErrorBox component with specified height', () => {
    render(<ErrorBox height={200} />)

    const errorBox = screen.getByTestId('error-box')
    expect(errorBox.style.height).toBe('200px')
  })
})
