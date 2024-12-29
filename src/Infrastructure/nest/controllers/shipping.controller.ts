import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateShippingDto } from 'src/application/dtos/CreateShippingDTO';
import { createShipping, getShipping } from 'src/Infrastructure/instances';
import { apiResponseCreator } from '../api-response-creator';

@Controller('shippings')
export class ShippingController {
  @Get('')
  findAll() {
    return getShipping.all();
  }

  @Post('')
  postShipping(
    @Body() createShippingDTO: CreateShippingDto,
    @Res() response: Response,
  ) {
    try {
      const createdShipping = createShipping.run(createShippingDTO);
      return response
        .status(201)
        .json(apiResponseCreator.success(createdShipping));
    } catch (err) {
      return response.status(500).json(apiResponseCreator.failure(err.message));
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return getShipping.byId(id);
  }
}
