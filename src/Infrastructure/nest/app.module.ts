import { Module } from '@nestjs/common';
import { AppService } from '../../application/services/app.service';
import { AppController } from './controllers/app.controller';
import { ShippingController } from './controllers/shipping.controller';

@Module({
  imports: [],
  controllers: [AppController, ShippingController],
  providers: [AppService],
})
export class AppModule {}
