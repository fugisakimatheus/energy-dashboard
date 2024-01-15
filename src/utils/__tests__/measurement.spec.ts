import { Measurement } from '@/data/models/measurement/measurement-model'
import { groupMeasurementsConsumptionByMonths } from '../measurement'
import { MeasurementMock } from '@/data/models/__mocks__/measurement-mock'

describe('groupMeasurementsConsumptionByMonths', () => {
  test('should groups measurements by months and calculates total consumption', () => {
    const mockData: Measurement[] = [
      new MeasurementMock()
        .withYear(2021)
        .withMonth(2)
        .withConsumption(120)
        .build(),
      new MeasurementMock()
        .withYear(2021)
        .withMonth(2)
        .withConsumption(200)
        .build(),
      new MeasurementMock()
        .withYear(2021)
        .withMonth(4)
        .withConsumption(100)
        .build(),
      new MeasurementMock()
        .withYear(2021)
        .withMonth(6)
        .withConsumption(110)
        .build(),
    ]

    const result = groupMeasurementsConsumptionByMonths(mockData)

    expect(result).toEqual([
      { month: 2, year: 2021, monthlyConsumptionTotal: 320 },
      { month: 4, year: 2021, monthlyConsumptionTotal: 100 },
      { month: 6, year: 2021, monthlyConsumptionTotal: 110 },
    ])
  })

  test('should handles empty input array', () => {
    const result = groupMeasurementsConsumptionByMonths([])
    expect(result).toEqual([])
  })
})
