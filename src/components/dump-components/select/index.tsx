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
      radius="lg"
      classNames={{
        trigger:
          'border-border/40 bg-surface/60 data-[hover=true]:bg-surface/80',
        value: 'font-medium text-foreground',
        popoverContent: 'border border-border/40 bg-card',
      }}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </UISelect>
  )
}
