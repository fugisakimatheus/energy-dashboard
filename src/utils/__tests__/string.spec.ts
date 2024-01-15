import { capitalize } from '../string'

describe('capitalize', () => {
  test('should capitalizes the first letter of a word', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  test('should handles empty string', () => {
    expect(capitalize('')).toBe('')
  })

  test('should handles already capitalized word', () => {
    expect(capitalize('World')).toBe('World')
  })
})
