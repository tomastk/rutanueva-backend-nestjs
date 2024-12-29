import { CreateShippingDto } from 'src/application/dtos/CreateShippingDTO';

export class Shipping {
  constructor(
    public readonly id: string,
    public readonly shippingDescription: string,
    public readonly clientName: string,
    public readonly coordinates: {
      lat: string;
      long: string;
    },
  ) {}

  static fromDTO(dto: CreateShippingDto, id: string) {
    return new Shipping(
      id,
      dto.shippingDescription,
      dto.clientName,
      dto.coordinates,
    );
  }
}
