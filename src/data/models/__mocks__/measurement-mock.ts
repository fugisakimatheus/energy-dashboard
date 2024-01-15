import { faker } from '@faker-js/faker'
import { Measurement } from '../measurement/measurement-model'

export class MeasurementMock {
  id: string = ''
  reference: string = ''
  year: number = 0
  month: number = 0
  day: number = 0
  hour: number = 0
  consumption: number = 0
  agent: string = ''
  meter: string = ''
  origin: string = ''
  intervalInMinutes: number = 0
  isEstimated: boolean = false

  withId(id: string) {
    this.id = id
    return this
  }

  withReference(reference: string) {
    this.reference = reference
    return this
  }

  withYear(year: number) {
    this.year = year
    return this
  }

  withMonth(month: number) {
    this.month = month
    return this
  }

  withDay(day: number) {
    this.day = day
    return this
  }

  withHour(hour: number) {
    this.hour = hour
    return this
  }

  withConsumption(consumption: number) {
    this.consumption = consumption
    return this
  }

  withAgent(agent: string) {
    this.agent = agent
    return this
  }

  withMeter(meter: string) {
    this.meter = meter
    return this
  }

  withOrigin(origin: string) {
    this.origin = origin
    return this
  }

  withIntervalInMinutes(intervalInMinutes: number) {
    this.intervalInMinutes = intervalInMinutes
    return this
  }

  withIsEstimated(isEstimated: boolean) {
    this.isEstimated = isEstimated
    return this
  }

  fill() {
    this.id = faker.string.uuid()
    this.reference = faker.date.past().toLocaleDateString()
    this.year = faker.date.past().getFullYear()
    this.month = faker.date.past().getMonth() + 1
    this.day = faker.date.past().getDate()
    this.hour = faker.date.past().getHours()
    this.consumption = faker.number.float({ min: 0, max: 1000 })
    this.agent = faker.internet.userName()
    this.meter = faker.internet.userName()
    this.origin = faker.internet.userName()
    this.intervalInMinutes = faker.number.int({ min: 0, max: 60 })
    this.isEstimated = faker.datatype.boolean()
    return this
  }

  generate(quantity = 10) {
    return Array.from({ length: quantity }).map(() =>
      new MeasurementMock().fill().build(),
    )
  }

  build(): Measurement {
    return {
      id: this.id,
      reference: this.reference,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      consumption: this.consumption,
      agent: this.agent,
      meter: this.meter,
      origin: this.origin,
      intervalInMinutes: this.intervalInMinutes,
      isEstimated: this.isEstimated,
    }
  }
}
