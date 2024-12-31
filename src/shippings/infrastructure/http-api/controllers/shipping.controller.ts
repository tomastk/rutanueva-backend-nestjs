import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateShippingDto } from 'src/shippings/domain/dtos/CreateShippingDTO';
import { apiResponseCreator } from '../../../../shared/nest/api-response-creator';
import { CreateShipping } from 'src/shippings/application/use-cases/create-shipping';
import { GetShippings } from 'src/shippings/application/use-cases/get-shippings';
import { ApiBody } from '@nestjs/swagger';

@Controller('shippings')
export class ShippingController {
  constructor(
    private readonly createShipping: CreateShipping,
    private readonly getShipping: GetShippings,
  ) {}

  @Get('')
  async findAll() {
    return await this.getShipping.all();
  }

  @Post('')
  @ApiBody({ type: CreateShippingDto })
  async postShipping(
    @Body() createShippingDTO: CreateShippingDto,
    @Res() response: Response,
  ) {
    try {
      const createdShipping = await this.createShipping.run(createShippingDTO);
      return response
        .status(201)
        .json(apiResponseCreator.success(createdShipping));
    } catch (err) {
      return response.status(500).json(apiResponseCreator.failure(err.message));
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getShipping.byId(id);
  }
}
