import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty({
    description: 'Name of the client receiving the shipment',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({
    description: 'Description of the shipment',
    example: 'Electronics delivery',
  })
  @IsString()
  @IsNotEmpty()
  shippingDescription: string;

  @ApiProperty({
    description: 'Latitude of the shipment destination',
    example: '40.712776',
  })
  @IsLatitude()
  lat: string;

  @ApiProperty({
    description: 'Longitude of the shipment destination',
    example: '-74.005974',
  })
  @IsLongitude()
  long: string;

  constructor(
    clientName: string,
    shippingDescription: string,
    lat: string,
    long: string,
  ) {
    this.clientName = clientName;
    this.shippingDescription = shippingDescription;
    this.lat = lat;
    this.long = long;
  }

  // Propiedad para obtener las coordenadas como un objeto de tipo 'coordinates'
  get coordinates() {
    return { lat: this.lat, long: this.long };
  }

  // Método para establecer las coordenadas
  setCoordinates(lat: string, long: string) {
    this.lat = lat;
    this.long = long;
  }
}
