import { renderComponent } from '@/utils/test'
import { act, screen } from '@testing-library/react'
import Select from '..'
import { SelectOption } from '../../select'

describe('Select', () => {
  const options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  it('should renders Select component correctly', () => {
    renderComponent(<Select options={options} aria-label="select" />)
    const select = screen.getByTestId('select-component')
    expect(select).toBeTruthy()
  })

  it('should renders Select component with options', async () => {
    renderComponent(<Select options={options} aria-label="select" isOpen />)

    const optionsItems = screen.getAllByRole('option')
    expect(optionsItems.length).toBe(options.length)
  })

  it('should select an option', async () => {
    const onChange = jest.fn()
    const { user } = renderComponent(
      <Select
        options={options}
        aria-label="select"
        isOpen
        onChange={e => onChange(e.target.value)}
      />,
    )

    const optionsItems = screen.getAllByRole('option')

    await act(async () => {
      await user.click(optionsItems[1])

      expect(onChange).toHaveBeenCalledWith('option2')
    })
  })
})
