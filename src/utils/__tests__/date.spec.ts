import {
  getMonthName,
  generateMonthNumbers,
  generateMonthDays,
  generateMonthsWithNames,
  getAvailableYears,
} from '../date'

describe('getMonthName', () => {
  test('should returns the correct month name', () => {
    expect(getMonthName(1)).toBe('Jan')
    expect(getMonthName(6)).toBe('Jun')
    expect(getMonthName(12)).toBe('Dez')
  })
})

describe('generateMonthNumbers', () => {
  test('should generates an array of month numbers from 1 to 12', () => {
    expect(generateMonthNumbers()).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    ])
  })
})

describe('generateMonthDays', () => {
  test('should generates an array of strings from 1 to 31', () => {
    expect(generateMonthDays()).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ])
  })
})

describe('generateMonthsWithNames', () => {
  test('should generates an array of month objects with numbers and names', () => {
    const months = generateMonthsWithNames()
    expect(months).toHaveLength(12)
    expect(months[0]).toEqual({ monthNumber: '1', monthName: 'Jan' })
  })
})

describe('getAvailableYears', () => {
  test('should returns an array of available years', () => {
    expect(getAvailableYears()).toEqual(['2021', '2022'])
  })
})
