import { render, screen } from '@testing-library/react'
import AnualConsumptionChartNoData from '../no-data'

describe('AnualConsumptionChartNoData', () => {
  test('should renders component', () => {
    render(<AnualConsumptionChartNoData />)

    expect(screen.getByText('Consumo Anual (2021 / 2022)')).toBeTruthy()
    expect(
      screen.getByText(
        'Comparativo mensal do consumo realizado nos anos de 2021 e 2022.',
      ),
    ).toBeTruthy()
    expect(screen.getByText('Nenhum resultado encontrado.')).toBeTruthy()
  })
})
