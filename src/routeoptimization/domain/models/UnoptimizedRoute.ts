import { Shipping } from 'src/shippings/domain/models/Shipping';
import { Coordinates, OptimizeRouteDTO } from '../dtos/optimize-route-dto';

export class UnoptimizedRoute {
  constructor(
    private origin: Coordinates,
    private destination: Coordinates,
    private shippings: Shipping[],
  ) {}
}
