import { Shipping } from 'src/domain/models/Shipping';
import { CreateShipping } from './create-shipping';
import { shippingList } from 'src/Infrastructure/instances';

export class GetShippings {
  all(): Shipping[] {
    return shippingList;
  }
  byId(id: string) {
    return shippingList.find((shipping) => shipping.id === id);
  }
}
