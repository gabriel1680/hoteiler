import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";

import { TypeORMTransactionSession } from "../../database/typeorm/TypeORMTransactionalSession";
import { RabbitMQEventBus } from "../../event-bus/RabbitMQEventBus";
import { InMemoryEventBus } from "../../event-bus/InMemoryEventBus";

export const sharedProviders: Provider[] = [
    {
        provide: "EventBus",
        useFactory: async () => {
            const createEventBus =
                process.env.ENV === "test"
                    ? async () => new InMemoryEventBus()
                    : async () => {
                          const eb = new RabbitMQEventBus();
                          await eb.connect();
                          return eb;
                      };
            return await createEventBus();
        },
    },
    {
        provide: "DataSource",
        useFactory: async () => {
            const ds = new DataSource({
                type: process.env.DB_TYPE as "sqlite" | "mysql",
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                synchronize: true,
                entities: [__dirname + "/../../../../**/entities/**/*.{js,ts}"],
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
