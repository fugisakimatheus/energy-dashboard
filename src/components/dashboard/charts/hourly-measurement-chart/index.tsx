'use client'

import { MeasurementService } from '@/data/services/measurements-service'

export default function HourlyMeasurementChart() {
  const response = MeasurementService.search({
    filters: { day: '', month: '', year: '' },
  })

  return <></>
}
