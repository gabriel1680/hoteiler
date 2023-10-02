import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";

import { AdminModule } from "src/admin/infra/http/nestjs/admin.module";
import { BookingModule } from "src/booking/infra/http/nestjs/booking.module";
import { RabbitMQEventBus } from "src/@kernel/infra/event-bus/RabbitMQEventBus";

@Module({
    imports: [AdminModule, BookingModule],
    providers: [
        {
            provide: "EventBus",
            useFactory: async () => {
                const eventBus = new RabbitMQEventBus();
                await eventBus.connect();
                return eventBus;
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
