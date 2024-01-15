import { render, screen } from '@testing-library/react'
import Card from '..'

describe('Card', () => {
  it('should renders correctly', () => {
    render(<Card>Teste 123</Card>)

    const component = screen.getByText('Teste 123')

    expect(component).toBeTruthy()
    expect(component.className.includes('h-full')).toBeTruthy()
  })

  it('should renders correctly with fitContent', () => {
    render(<Card fitContent>Teste 123 Fit</Card>)

    const component = screen.getByText('Teste 123 Fit')

    expect(component).toBeTruthy()
    expect(component.className.includes('h-fit')).toBeTruthy()
  })
})
