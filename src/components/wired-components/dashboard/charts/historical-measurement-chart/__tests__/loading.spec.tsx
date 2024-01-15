import { render, screen } from '@testing-library/react'
import HistoricalMeasurementChartLoading from '../loading'

describe('HistoricalMeasurementChartLoading', () => {
  test('should renders component', () => {
    render(<HistoricalMeasurementChartLoading />)

    const chartLoadingColumns = screen.getAllByTestId('chart-bar')
    expect(chartLoadingColumns.length).toEqual(32)
  })
})
