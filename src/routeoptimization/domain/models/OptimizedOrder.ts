import { Coordinates } from '../dtos/optimize-route-dto';

export class OptimizedOrder {
  constructor(
    public order: number,
    public coordinates: Coordinates,
    public shippingDetail: string,
  ) {}
}
