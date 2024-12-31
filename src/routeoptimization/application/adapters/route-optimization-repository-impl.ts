import { Injectable } from '@nestjs/common';
import { OptimizedRoute } from '../../domain/models/OptimizedRoute';
import { RouteOptimizationRepository } from '../../domain/repository/RouteOptimization.repository';
import { UnoptimizedRoute } from '../../domain/models/UnoptimizedRoute';

@Injectable()
export class RouteOptimizationRepositoryImp extends RouteOptimizationRepository {
  optimizeRoute(unoptimizedRoute: UnoptimizedRoute): Promise<OptimizedRoute> {
    return Promise.resolve({});
  }
}
