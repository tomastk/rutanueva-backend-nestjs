import { CreateShippingDto } from 'src/shippings/domain/dtos/CreateShippingDTO';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping')
export class Shipping {
  constructor(
    shippingDescription: string,
    clientName: string,
    coordinates: {
      lat: string;
      long: string;
    },
  ) {
    this.shippingDescription = shippingDescription;
    this.clientName = clientName;
    this.coordinates = coordinates;
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  shippingDescription: string;

  @Column()
  clientName: string;

  @Column('json')
  coordinates: {
    lat: string;
    long: string;
  };

  static fromDTO(dto: CreateShippingDto) {
    return new Shipping(dto.shippingDescription, dto.clientName, {
      lat: dto.lat,
      long: dto.long,
    });
  }
}
