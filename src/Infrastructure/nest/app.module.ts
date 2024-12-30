import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from '../../application/services/app.service';
import { AppController } from './controllers/app.controller';
import { ShippingController } from './controllers/shipping.controller';
import { ConfigModule } from '@nestjs/config';
import { Shipping } from 'src/domain/models/Shipping';
import { CreateShipping } from 'src/application/use-cases/create-shipping';
import { GetShippings } from 'src/application/use-cases/get-shippings';

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
  controllers: [AppController, ShippingController],
  providers: [AppService, CreateShipping, GetShippings],
})
export class AppModule {}
