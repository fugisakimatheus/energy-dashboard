const numberFormatter = new Intl.NumberFormat('pt-BR')

export const formatNumber = (value: number) => {
  return numberFormatter.format(value)
}
