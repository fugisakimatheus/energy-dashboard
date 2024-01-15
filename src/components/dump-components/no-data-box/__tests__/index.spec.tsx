import { render, screen } from '@testing-library/react'
import NoDataBox from '..'

describe('NoDataBox', () => {
  it('should renders NoDataBox component with specified height', () => {
    render(<NoDataBox height={100} />)

    const noDataBox = screen.getByTestId('no-data-box')
    expect(noDataBox.style.height).toBe('100px')
  })

  it('should renders NoDataBox component with specified height when is string', () => {
    render(<NoDataBox height="220px" />)

    const noDataBox = screen.getByTestId('no-data-box')
    expect(noDataBox.style.height).toBe('220px')
  })
})
