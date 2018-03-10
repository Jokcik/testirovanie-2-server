import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import config from './config';

config();

async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	await app.listen(3001);
}
bootstrap();
