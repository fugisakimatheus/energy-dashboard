import {
  formatEnergy,
  formatEnergyValue,
  formatNumber,
} from '../number'

describe('formatNumber', () => {
  test('should formats a number using pt-BR locale', () => {
    const formattedNumber = formatNumber(1234.56)
    expect(formattedNumber).toBe('1.234,56')
  })
})

describe('formatEnergyValue', () => {
  test('should format energy values with 3 decimal places in pt-BR', () => {
    expect(formatEnergyValue(104.859)).toBe('104,859')
    expect(formatEnergyValue(113.994852)).toBe('113,995')
  })
})

describe('formatEnergy', () => {
  test('should append MWh unit', () => {
    expect(formatEnergy(104.859)).toBe('104,859 MWh')
  })
})
