import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

bootstrap();

async function bootstrap() {
    dotenv.config({ path: __dirname + "/../../../../env/.env" });
    const app = await NestFactory.create(AppModule);
    await app.listen(3333);
}
