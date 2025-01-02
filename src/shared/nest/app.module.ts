import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../app.service';
import { AppController } from './controllers/app.controller';
import { ShippingController } from '../../shippings/infrastructure/http-api/controllers/shipping.controller';
import { ConfigModule } from '@nestjs/config';
import { Shipping } from 'src/shippings/domain/models/Shipping';
import { CreateShipping } from 'src/shippings/application/use-cases/create-shipping';
import { GetShippings } from 'src/shippings/application/use-cases/get-shippings';
import { OptimizeRouteController } from 'src/routeoptimization/infraestructure/http-api/controllers/optimize-route-controller';
import { RouteOptimizationRepository } from 'src/routeoptimization/domain/repository/RouteOptimization.repository';
import { OptimizeRoute } from 'src/routeoptimization/application/use-cases/optimize-route';
import { Logger } from '../logger/logger';
import { ForGetShippings } from 'src/shippings/domain/ports/for-get-shippings';
import { ShippingManager } from 'src/routeoptimization/application/adapters/shipping-manager';
import { ForShippingManagment } from 'src/routeoptimization/domain/ports/for-shipping-managment';
import { OpenRouteServiceRouteOptimizer } from 'src/routeoptimization/application/adapters/route-optimization-repository-impl';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USERNAME,
      entities: [Shipping],
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Shipping]),
  ],
  controllers: [AppController, ShippingController, OptimizeRouteController],
  providers: [
    Logger,
    AppService,
    CreateShipping,
    OptimizeRoute,
    GetShippings,
    {
      provide: ForGetShippings,
      useClass: GetShippings,
    },
    {
      provide: ForShippingManagment,
      useClass: ShippingManager,
    },
    {
      provide: RouteOptimizationRepository, // Proveedor: la interfaz
      useClass: OpenRouteServiceRouteOptimizer, // Implementación concreta
    },
  ],
})
export class AppModule {}
