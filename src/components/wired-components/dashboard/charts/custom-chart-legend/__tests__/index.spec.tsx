import { renderComponent } from '@/utils/test'
import { screen } from '@testing-library/react'
import CustomChartLegend from '..'

describe('CustomChartLegend', () => {
  test('should renders component with provided data', () => {
    const testData = [
      { color: '#ff0000', value: 'Red' },
      { color: '#00ff00', value: 'Green' },
      { color: '#0000ff', value: 'Blue' },
    ]

    renderComponent(<CustomChartLegend data={testData} />)

    const customChartLegend = screen.getByTestId('custom-chart-legend')

    expect(customChartLegend).toBeTruthy()

    testData.forEach(entry => {
      const legendItem = screen.getByTestId(entry.value)
      expect(legendItem).toBeTruthy()
    })
  })
})
