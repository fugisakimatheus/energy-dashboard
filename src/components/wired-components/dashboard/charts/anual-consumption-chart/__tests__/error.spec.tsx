import { render, screen } from '@testing-library/react'
import AnualConsumptionChartError from '../error'

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }))

describe('AnualConsumptionChartError', () => {
  test('should renders component', () => {
    render(<AnualConsumptionChartError />)

    expect(screen.getByText('Consumo Anual (2021 / 2022)')).toBeTruthy()
    expect(
      screen.getByText(
        'Comparativo mensal do consumo realizado nos anos de 2021 e 2022.',
      ),
    ).toBeTruthy()
    expect(
      screen.getByText(
        'Ops! ocorreu um erro ao carregar as informações, tente novamente em instantes.',
      ),
    ).toBeTruthy()
  })
})
