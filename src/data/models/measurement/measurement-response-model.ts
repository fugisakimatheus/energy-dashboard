import { Measurement } from "./measurement-model";

export interface GetMeasurementsResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Measurement[];
}
