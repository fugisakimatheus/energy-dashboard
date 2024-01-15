import { render, screen } from '@testing-library/react'
import AnualConsumptionChartLoading from '../loading'

describe('AnualConsumptionChartLoading', () => {
  test('should renders component', () => {
    render(<AnualConsumptionChartLoading />)

    const chartLoadingColumns = screen.getAllByTestId('chart-bar')
    expect(chartLoadingColumns.length).toEqual(15)
  })
})
