import { Module } from '@nestjs/common';
import { OpenRouteServiceRouteOptimizer } from 'src/routeoptimization/application/adapters/route-optimization-repository-impl';
import { OptimizeRoute } from 'src/routeoptimization/application/adapters/optimize-route';
import { RouteOptimizationRepository } from 'src/routeoptimization/domain/repository/RouteOptimization.repository';
import { ShippingModule } from 'src/shippings/shipping.module';
import { OptimizeRouteController } from '../http-api/controllers/optimize-route-controller';
import { Logger } from 'src/shared/logger/logger';

@Module({
  imports: [ShippingModule],
  controllers: [OptimizeRouteController],
  providers: [
    Logger,
    OptimizeRoute,
    {
      provide: RouteOptimizationRepository,
      useClass: OpenRouteServiceRouteOptimizer,
    },
  ],
})
export class RouteOptimizationModule {}
