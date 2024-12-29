import { Shipping } from 'src/domain/models/Shipping';
import { CreateShippingDto } from '../dtos/CreateShippingDTO';
import { logger, shippingList } from 'src/Infrastructure/instances';
import { SHIPPING_IS_INVALID } from 'src/Infrastructure/errors';

export class CreateShipping {
  private isShippingValid(shipping: Shipping): boolean {
    return !shippingList
      .map((shipping) => shipping.shippingDescription)
      .includes(shipping.shippingDescription);
  }

  run(createShippingDTO: CreateShippingDto): Shipping {
    logger.log('POST - /shipping');
    const shipping = Shipping.fromDTO(
      createShippingDTO,
      String(shippingList.length + 1),
    );

    if (!this.isShippingValid(shipping)) {
      logger.error('DUPLICATE SHIPPING - /shipping');
      logger.debug(JSON.stringify(shipping, null, 2));
      throw new Error(SHIPPING_IS_INVALID);
    }

    shippingList.push(shipping);
    logger.log('SHIPPING CREATED - /shipping');

    return shipping;
  }
}
