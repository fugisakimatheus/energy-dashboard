import { render, screen } from '@testing-library/react'
import HourlyMeasurementChartHeader from '../header'

describe('HourlyMeasurementChartHeader', () => {
  test('should renders component', () => {
    render(<HourlyMeasurementChartHeader />)

    expect(screen.getByText('Medição Horária (Por Dia)')).toBeTruthy()
  })
})
