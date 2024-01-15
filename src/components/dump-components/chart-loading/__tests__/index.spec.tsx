import { render } from '@testing-library/react'
import ChartLoading from '..'

describe('ChartLoading', () => {
  it('should renders the component with the correct number of columns', () => {
    const { container } = render(<ChartLoading colsNumber={5} />)

    const columns = container.querySelectorAll('.animate-pulse > div')
    expect(columns.length).toBe(5)
  })

  it('should generates random heights for each column', () => {
    const { container } = render(<ChartLoading colsNumber={3} />)

    const columns = container.querySelectorAll('.animate-pulse > div')
    columns.forEach(column => {
      const style = column.getAttribute('style') as string
      const numbers = style.match(/\d/g) as string[]
      const height = Number(numbers.join(''))
      expect(height).toBeGreaterThanOrEqual(90)
      expect(height).toBeLessThanOrEqual(240)
    })
  })

  it('should hides columns with number greater than 14 on medium devices', () => {
    const { container } = render(<ChartLoading colsNumber={20} />)

    const hiddenColumns = container.querySelectorAll('.hidden.md\\:block')
    expect(hiddenColumns.length).toBe(6)
  })

  it('should does not hide columns with number less than or equal to 14 on medium devices', () => {
    const { container } = render(<ChartLoading colsNumber={10} />)

    const hiddenColumns = container.querySelectorAll('.hidden.md\\:block')
    expect(hiddenColumns.length).toBe(0)
  })
})
