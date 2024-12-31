import { Module } from '@nestjs/common';
import { CreateShipping } from 'src/shippings/application/use-cases/create-shipping';
import { GetShippings } from 'src/shippings/application/use-cases/get-shippings';
import { ShippingController } from './infrastructure/http-api/controllers/shipping.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './domain/models/Shipping';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping])],
  controllers: [ShippingController],
  providers: [CreateShipping, GetShippings],
})
export class ShippingModule {}
