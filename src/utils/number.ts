const integerFormatter = new Intl.NumberFormat('pt-BR')

const energyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
})

export const formatNumber = (value: number) => {
  return integerFormatter.format(value)
}

export const formatEnergyValue = (value: number) => {
  return energyFormatter.format(value)
}

export const formatEnergy = (value: number, unit = 'MWh') => {
  return `${formatEnergyValue(value)} ${unit}`
}

export const formatChartTooltipEnergy = (
  value: number,
  label: string,
): [string, string] => {
  return [`${label}: ${formatEnergy(value)}`, '']
}
