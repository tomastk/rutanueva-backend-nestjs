import { Injectable } from '@nestjs/common';
import { ForShippingManagment } from '../../domain/ports/for-shipping-managment';
import { ForGetShippings } from 'src/shippings/domain/ports/for-get-shippings';
import { Shipping } from 'src/shippings/domain/models/Shipping';

@Injectable()
export class ShippingManager implements ForShippingManagment {
  constructor(private readonly shippingAdapter: ForGetShippings) {}
  getShippingByIds(ids: string[]): Promise<Shipping[]> {
    return this.shippingAdapter.findShippingsByID(ids);
  }
  getShippings(): Promise<Shipping[]> {
    return this.shippingAdapter.getAll();
  }
}
