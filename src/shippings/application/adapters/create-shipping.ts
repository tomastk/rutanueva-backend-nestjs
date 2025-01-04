import { Shipping } from 'src/shippings/domain/models/Shipping';
import { CreateShippingDto } from '../../domain/dtos/CreateShippingDTO';
import { logger } from 'src/shared/instances';
import { SHIPPING_IS_INVALID } from 'src/shared/errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CreateShipping {
  constructor(
    @InjectRepository(Shipping)
    private readonly shippingRepository: Repository<Shipping>,
  ) {}

  private isShippingValid(shipping: Shipping): boolean {
    return true;
  }
  async run(createShippingDTO: CreateShippingDto): Promise<Shipping> {
    logger.log('POST - /shipping');
    const shipping = Shipping.fromDTO(createShippingDTO);
    console.log(shipping.clientName);
    logger.log(JSON.stringify(shipping, null, 2));

    if (!this.isShippingValid(shipping)) {
      logger.error('DUPLICATE SHIPPING - /shipping');
      logger.debug(JSON.stringify(shipping, null, 2));
      throw new HttpException(SHIPPING_IS_INVALID, HttpStatus.BAD_REQUEST);
    }

    const createdShipping = this.shippingRepository.create(shipping);
    await this.shippingRepository.save(createdShipping);
    return createdShipping;
  }
}
