import { ApiProperty } from '@nestjs/swagger';

// Define Coordinates como una clase en lugar de tipo
export class Coordinates {
  @ApiProperty({ description: 'Latitude of the location', example: '40.7128' })
  lat: string;

  @ApiProperty({
    description: 'Longitude of the location',
    example: '-74.0060',
  })
  long: string;
}

// Define OptimizeRouteDTO como una clase
export class OptimizeRouteDTO {
  @ApiProperty({ type: Coordinates, description: 'Origin coordinates' })
  originCoordinates: Coordinates;

  @ApiProperty({ type: Coordinates, description: 'Finish coordinates' })
  finishCoordinates: Coordinates;

  @ApiProperty({
    type: [String],
    description: 'List of shipping IDs to optimize the route',
    example: ['shipping1', 'shipping2'],
  })
  shippingsToOptimize: string[];
}
