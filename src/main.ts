import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/nest/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ruta Nueva')
    .setDescription(
      'API para generar, optimizar y distribuír rutas de pedidos. ',
    )
    .setVersion('0.0.1')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
