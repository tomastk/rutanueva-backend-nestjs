import { Shipping } from 'src/shippings/domain/models/Shipping';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ForGetShippings } from 'src/shippings/domain/ports/for-get-shippings';

@Injectable()
export class GetShippings extends ForGetShippings {
  constructor(
    @InjectRepository(Shipping)
    private readonly shippingRepository: Repository<Shipping>,
  ) {
    super();
  }

  getAll(): Promise<Shipping[]> {
    return this.shippingRepository.find();
  }

  async all(): Promise<Shipping[]> {
    return await this.shippingRepository.find();
  }
  byId(id: string) {
    return this.shippingRepository.findOne({ where: { id } });
  }

  async findShippingsByID(ids: string[]): Promise<Shipping[]> {
    return await this.shippingRepository.findBy({ id: In(ids) });
  }
}
