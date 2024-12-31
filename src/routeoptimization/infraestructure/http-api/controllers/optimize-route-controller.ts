import { Body, Controller, Get, Post } from '@nestjs/common';
import { OptimizeRouteDTO } from 'src/routeoptimization/domain/dtos/optimize-route-dto';
import { OptimizeRoute } from 'src/routeoptimization/application/use-cases/optimize-route';
import { Logger } from 'src/shared/logger/logger';
import { apiResponseCreator } from 'src/shared/nest/api-response-creator';
import { ApiBody } from '@nestjs/swagger';

@Controller('optimize-route')
export class OptimizeRouteController {
  constructor(
    private readonly optimizeRoute: OptimizeRoute,
    private readonly logger: Logger,
  ) {}

  @Get('')
  async get() {
    return 'Endpoint Optimize Route its ok';
  }

  @Post('')
  @ApiBody({ type: () => OptimizeRouteDTO }) // Usa una función flecha para pasar el tipo
  async post(@Body() dto: OptimizeRouteDTO) {
    this.logger.log('POST /optimize-route');
    this.logger.debug(JSON.stringify(dto, null, 2));
    try {
      const optimizedRoute = await this.optimizeRoute.run(dto);
      return apiResponseCreator.success(optimizedRoute);
    } catch (error) {
      this.logger.error(error.message);
      return apiResponseCreator.failure(error.message);
    }
  }
}
