import { Coordinates } from '../dtos/optimize-route-dto';
import { OptimizedOrder } from './OptimizedOrder';

export class OptimizedRoute {
  constructor(
    originCoordinates: Coordinates,
    destinationCoordinates: Coordinates,
    optimizedRoute: OptimizedOrder[],
  ) {}
}
