import { Coordinates } from 'src/routeoptimization/domain/dtos/optimize-route-dto';
import { UnoptimizedRoute } from 'src/routeoptimization/domain/models/UnoptimizedRoute';
import { Shipping } from 'src/shippings/domain/models/Shipping';
import {
  Jobs,
  Vehicles,
  OptimizationRequest,
} from '../schemas/ors-unoptimized-route';

export class OrsParser {
  static fromShippingToJob(shipping: Shipping): Jobs {
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

  static fromCoordinatesToVehicle(
    origin: Coordinates,
    end: Coordinates,
  ): Vehicles {
    return {
      profile: 'driving-car', // Tipo de vehículo
      capacity: [10000], // Dummy capacity (por ejemplo, capacidad 10000 kg)
      id: Math.floor(Math.random() * 1000000), // Genera un número aleatorio entero
      start: [Number(origin.long), Number(origin.lat)],
      end: [Number(end.long), Number(end.lat)],
      skills: [1, 2], // Dummy skills (por ejemplo, habilidades 1 y 2)
    };
  }

  static fromUnoptimizedToRoutePlanning(
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
}
