'use client'

import {
  SelectItem,
  Select as UISelect,
  SelectProps as UISelectProps,
} from '@nextui-org/react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<UISelectProps, 'children'> {
  options: SelectOption[]
}

export default function Select(props: SelectProps) {
  const { options, ...rest } = props
  return (
    <UISelect
      data-testid="select-component"
      variant="bordered"
      size="sm"
      color="primary"
      classNames={{ value: 'font-bold' }}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <SelectItem key={value} value={value} color="primary">
          {label}
        </SelectItem>
      ))}
    </UISelect>
  )
}
