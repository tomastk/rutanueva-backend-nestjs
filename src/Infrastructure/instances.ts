import { CreateShipping } from 'src/application/use-cases/create-shipping';
import { GetShippings } from 'src/application/use-cases/get-shippings';
import { Shipping } from 'src/domain/models/Shipping';
import { Logger } from './logger/logger';

export const logger = new Logger();
export const shippingList: Shipping[] = [];
export const getShipping = new GetShippings();
export const createShipping = new CreateShipping();