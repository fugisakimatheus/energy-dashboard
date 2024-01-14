'use client'

type ChartLoadingProps = {
  colsNumber: number
}

export default function ChartLoading(props: ChartLoadingProps) {
  const { colsNumber } = props

  function generateRandomNumber() {
    const randomNumber = Math.random()
    const intervalNumber = 90 + randomNumber * (240 - 90)
    return Math.round(intervalNumber)
  }

  const getClassByColumnNumber = (value: number) => {
    if (value > 14) return 'hidden md:block'
    return ''
  }

  return (
    <div className="gap-4 flex flex-row items-end justify-center w-full animate-pulse">
      {Array.from({ length: colsNumber }, (_, i) => i + 1).map(number => (
        <div
          key={number}
          style={{ height: `${generateRandomNumber()}px` }}
          className={`${getClassByColumnNumber(
            number,
          )} w-[15px] bg-gray-200 rounded-sm`}
        ></div>
      ))}
    </div>
  )
}
