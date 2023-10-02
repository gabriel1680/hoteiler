import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";

import { TypeORMTransactionSession } from "../../database/typeorm/TypeORMTransactionalSession";
import { RabbitMQEventBus } from "../../event-bus/RabbitMQEventBus";

export const sharedProviders: Provider[] = [
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
                entities: [__dirname + "/../../../**/entities/**/*.{js,ts}"],
                logging: ["error"],
            });
            await ds.initialize();
            return ds;
        },
    },
    {
        provide: "TransactionalSession",
        useFactory: (connection: DataSource) =>
            new TypeORMTransactionSession(connection),
        inject: ["DataSource"],
    },
];
