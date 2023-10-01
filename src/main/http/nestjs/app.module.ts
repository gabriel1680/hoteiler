import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import amqp from "amqplib";

import { AdminModule } from "src/admin/infra/http/nestjs/admin.module";
import { BookingModule } from "src/booking/infra/http/nestjs/booking.module";

@Module({
	imports: [AdminModule, BookingModule],
	providers: [
		{
			provide: "EventBus",
			useFactory: async () => {
				return await amqp.connect("amqp://localhost");
			},
		},
		{
			provide: "DataSource",
			useFactory: async () => {
				const ds = new DataSource({
					type: "sqlite",
					database: ":memory:",
					synchronize: true,
					entities: [
						__dirname + "/../../../**/entities/**/*.{js,ts}",
					],
					logging: ["error"],
				});
				await ds.initialize();
				return ds;
			},
		},
	],
})
export class AppModule {}
