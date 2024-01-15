import { render, screen } from '@testing-library/react'
import HistoricalMeasurementChartError from '../error'

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }))

describe('HistoricalMeasurementChartError', () => {
  test('should renders component', () => {
    render(<HistoricalMeasurementChartError />)

    expect(screen.getByText('Medição Histórica (Última Semana)')).toBeTruthy()
    expect(
      screen.getByText(
        'Ops! ocorreu um erro ao carregar as informações, tente novamente em instantes.',
      ),
    ).toBeTruthy()
  })
})
