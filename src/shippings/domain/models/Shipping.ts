import { CreateShippingDto } from 'src/shippings/domain/dtos/CreateShippingDTO';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shipping')
export class Shipping {
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
    return Object.assign(new Shipping(), dto);
  }
}
