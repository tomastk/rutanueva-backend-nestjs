import { UnoptimizedRoute } from 'src/routeoptimization/domain/models/UnoptimizedRoute';
import { OrsApiResponse } from '../schemas/ors-unoptimized-route';
import { OrsParser } from './OrsParser';
import axios from 'axios';
import { logger } from 'src/shared/instances';
import { Injectable } from '@nestjs/common';

export class RutaNuevaOrsConsumer {
  api_key: string;
  baseUrl: string;
  constructor({
    api_key,
    baseUrl = 'https://api.openrouteservice.org/optimization',
  }: {
    api_key: string;
    baseUrl?: string;
  }) {
    this.api_key = api_key;
    this.baseUrl = baseUrl;
  }

  async optimize(unoptimizedRoute: UnoptimizedRoute): Promise<OrsApiResponse> {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Charset': 'UTF-8',
      Authorization: this.api_key,
    };
    const body = OrsParser.fromUnoptimizedToRoutePlanning(unoptimizedRoute);

    const response = await axios.post<OrsApiResponse>(this.baseUrl, body, {
      headers,
    });

    logger.log('ORS RESPONSE');

    return response.data;
  }
}
