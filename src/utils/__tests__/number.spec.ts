import { formatNumber } from '../number'

describe('formatNumber', () => {
  test('should formats a number using pt-BR locale', () => {
    const formattedNumber = formatNumber(1234.56)
    expect(formattedNumber).toBe('1.234,56')
  })
})
