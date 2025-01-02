import { OptimizedRoute } from '../models/OptimizedRoute';
import { UnoptimizedRoute } from '../models/UnoptimizedRoute';

export abstract class RouteOptimizationRepository {
  abstract optimizeRoute(
    unoptimizedRoute: UnoptimizedRoute,
  ): Promise<OptimizedRoute>;
}
