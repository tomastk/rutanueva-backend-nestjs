import { Injectable } from '@nestjs/common';
import { Shipping } from '../models/Shipping';

export abstract class ForGetShippings {
  abstract getAll(): Promise<Shipping[]>;
  abstract findShippingsByID(ids: string[]): Promise<Shipping[]>;
}
