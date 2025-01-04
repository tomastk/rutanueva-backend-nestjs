import { Injectable } from '@nestjs/common';
import { OptimizeRouteDTO } from '../../domain/dtos/optimize-route-dto';
import { OptimizedRoute } from '../../domain/models/OptimizedRoute';
import { RouteOptimizationRepository } from '../../domain/repository/RouteOptimization.repository';
import { UnoptimizedRoute } from 'src/routeoptimization/domain/models/UnoptimizedRoute';
import { ForShippingManagment } from 'src/routeoptimization/domain/ports/for-shipping-managment';
import { NO_SHIPPINGS_FOUND } from 'src/shared/errors';
import { Logger } from 'src/shared/logger/logger';

@Injectable()
export class OptimizeRoute {
  constructor(
    private repository: RouteOptimizationRepository,
    private shippingManager: ForShippingManagment,
    private logger: Logger,
  ) {}

  async run(dto: OptimizeRouteDTO): Promise<OptimizedRoute> {
    const shippings = await this.shippingManager.getShippingByIds(
      dto.shippingsToOptimize,
    );

    this.logger.log('SHIPPINGS');
    this.logger.debug(JSON.stringify(shippings, null, 2));

    if (shippings.length === 0) {
      throw new Error(NO_SHIPPINGS_FOUND);
    }

    const unoptimizedRoute = new UnoptimizedRoute(
      dto.originCoordinates,
      dto.finishCoordinates,
      shippings,
    );

    this.logger.log('UNOPTIMIZED ROUTE');
    this.logger.debug(JSON.stringify(unoptimizedRoute, null, 2));

    return this.repository.optimizeRoute(unoptimizedRoute);
  }
}
