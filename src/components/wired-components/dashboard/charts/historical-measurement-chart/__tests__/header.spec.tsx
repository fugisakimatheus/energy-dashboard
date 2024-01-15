import { render, screen } from '@testing-library/react'
import HistoricalMeasurementChartHeader from '../header'

describe('HistoricalMeasurementChartHeader', () => {
  test('should renders component', () => {
    render(<HistoricalMeasurementChartHeader />)

    expect(screen.getByText('Medição Histórica (Última Semana)')).toBeTruthy()
  })
})
