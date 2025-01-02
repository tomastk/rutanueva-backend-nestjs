import { Injectable } from '@nestjs/common';
import { OptimizedRoute } from '../../domain/models/OptimizedRoute';
import { RouteOptimizationRepository } from '../../domain/repository/RouteOptimization.repository';
import { UnoptimizedRoute } from '../../domain/models/UnoptimizedRoute';
import * as openrouteservice from 'openrouteservice-js';
import {
  Jobs,
  OptimizationRequest,
  OrsApiResponse,
  Vehicles,
} from '../schemas/ors-unoptimized-route';
import { Coordinates } from 'src/routeoptimization/domain/dtos/optimize-route-dto';
import { Shipping } from 'src/shippings/domain/models/Shipping';

@Injectable()
export class OpenRouteServiceRouteOptimizer extends RouteOptimizationRepository {
  fromShippingToJob(shipping: Shipping): Jobs {
    return {
      id: Math.floor(Math.random() * 1000000), // Genera un número aleatorio entero
      description: shipping.shippingDescription,
      location: [
        Number(shipping.coordinates.long),
        Number(shipping.coordinates.lat),
      ],
      time_windows: [
        [0, 86400], // Dummy time window (desde 00:00 hasta 23:59)
      ],
      service: 300, // Dummy service time (por ejemplo, 300 segundos)
      amount: [1], // Dummy amount (por ejemplo, 1 unidad de carga)
      skills: [1], // Dummy skills (por ejemplo, habilidad 1)
    };
  }

  fromCoordinatesToVehicle(origin: Coordinates, end: Coordinates): Vehicles {
    return {
      profile: 'driving-car', // Tipo de vehículo
      capacity: [10000], // Dummy capacity (por ejemplo, capacidad 10000 kg)
      id: Math.floor(Math.random() * 1000000), // Genera un número aleatorio entero
      start: [Number(origin.long), Number(origin.lat)],
      end: [Number(end.long), Number(end.lat)],
      skills: [1, 2], // Dummy skills (por ejemplo, habilidades 1 y 2)
    };
  }

  fromUnoptimizedToRoutePlanning(
    unoptimized: UnoptimizedRoute,
  ): OptimizationRequest {
    const vehicles = [
      this.fromCoordinatesToVehicle(
        unoptimized.getOrigin(),
        unoptimized.getDestination(),
      ),
    ];
    const jobs = unoptimized.getShippings().map(this.fromShippingToJob);
    return {
      vehicles,
      jobs,
    };
  }

  async optimizeRoute(
    unoptimizedRoute: UnoptimizedRoute,
  ): Promise<OptimizedRoute> {
    console.debug('Initializing Optimization with API Key');
    const Optimization = new openrouteservice.Optimization({
      api_key: process.env.OPEN_ROUTE_SERVICE_API_KEY,
    });

    console.debug('Converting unoptimized route to route planning request');
    const routePlanningRequest =
      this.fromUnoptimizedToRoutePlanning(unoptimizedRoute);

    console.debug(
      'Route planning request:',
      JSON.stringify(routePlanningRequest, null, 2),
    );

    try {
      const response = (await Optimization.optimize(
        routePlanningRequest,
      )) as OrsApiResponse;

      return response.routes.map((route) =>
        route.steps.map((step) => ({
          description: step.description,
          location: step.location.reverse().join(','),
        })),
      );
    } catch (error) {
      console.error('Error during optimization:', error);
      throw new Error(error.message || 'Unknown error during optimization');
    }
  }
}
