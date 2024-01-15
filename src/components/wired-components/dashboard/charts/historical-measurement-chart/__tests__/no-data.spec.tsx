import { render, screen } from '@testing-library/react'
import HistoricalMeasurementChartNoData from '../no-data'

describe('HistoricalMeasurementChartNoData', () => {
  test('should renders component', () => {
    render(<HistoricalMeasurementChartNoData />)

    expect(screen.getByText('Medição Histórica (Última Semana)')).toBeTruthy()
    expect(screen.getByText('Nenhum resultado encontrado.')).toBeTruthy()
  })
})
