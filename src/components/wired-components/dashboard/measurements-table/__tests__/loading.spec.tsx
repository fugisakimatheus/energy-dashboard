import { render, screen } from '@testing-library/react'
import TableLoading from '../loading'

describe('TableLoading', () => {
  it('should renders correctly', () => {
    render(<TableLoading />)

    const tableRows = screen.getAllByTestId('table-row')

    expect(tableRows.length).toBe(10)
    expect(screen.getByText('Agente')).toBeTruthy()
    expect(screen.getByText('Ponto')).toBeTruthy()
    expect(screen.getByText('Data')).toBeTruthy()
    expect(screen.getByText('Hora')).toBeTruthy()
    expect(screen.getByText('Consumo Ativo (MWh)')).toBeTruthy()
    expect(screen.getByText('Origem')).toBeTruthy()
  })
})
