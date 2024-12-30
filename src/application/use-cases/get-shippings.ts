import { Shipping } from 'src/domain/models/Shipping';
import { CreateShipping } from './create-shipping';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetShippings {
  constructor(
    @InjectRepository(Shipping)
    private readonly shippingRepository: Repository<Shipping>,
  ) {}
  async all(): Promise<Shipping[]> {
    return await this.shippingRepository.find();
  }
  byId(id: string) {
    return this.shippingRepository.findOne({ where: { id } });
  }
}
