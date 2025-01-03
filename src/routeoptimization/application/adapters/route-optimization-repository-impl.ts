import { Injectable } from '@nestjs/common';
import { OptimizedRoute } from '../../domain/models/OptimizedRoute';
import { RouteOptimizationRepository } from '../../domain/repository/RouteOptimization.repository';
import { UnoptimizedRoute } from '../../domain/models/UnoptimizedRoute';
import { RutaNuevaOrsConsumer } from '../ors/RutaNuevaOrsConsumer';
import axios, { AxiosError } from 'axios';

@Injectable()
export class OpenRouteServiceRouteOptimizer extends RouteOptimizationRepository {
  async optimizeRoute(
    unoptimizedRoute: UnoptimizedRoute,
  ): Promise<OptimizedRoute> {
    console.debug('Initializing Optimization with API Key');
    const Optimization = new RutaNuevaOrsConsumer({
      api_key: process.env.OPEN_ROUTE_SERVICE_API_KEY,
    });

    console.debug('Converting unoptimized route to route planning request');

    try {
      const response = await Optimization.optimize(unoptimizedRoute);

      return response.routes.map((route) =>
        route.steps.map((step) => ({
          description: step.description,
          location: step.location.reverse().join(','),
        })),
      );
    } catch (error: any) {
      throw new Error(
        error.response.data.error || 'Unknown error during optimization',
      );
    }
  }
}
