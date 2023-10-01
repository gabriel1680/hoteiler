import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";

import { EventBus } from "src/@kernel/application/EventBus";
import { TransactionalSession } from "src/@kernel/application/TransactionalSession";
import { HotelFacade } from "src/admin/facade/HotelFacade";
import { BookRoom } from "src/booking/application/usecase/BookRoom";
import { BookRepository } from "src/booking/domain/BookRepository";
import { TypeORMBookRepository } from "../../database/typeorm/TypeORMBookRepository";
import { BookEntity } from "../../database/typeorm/entities/BookEntity";

export const bookingProviders: Provider[] = [
	{
		provide: "BookRepository",
		useFactory: (connection: DataSource) =>
			new TypeORMBookRepository(connection.getRepository(BookEntity)),
		inject: ["DataSource"],
	},
	{
		provide: BookRoom,
		useFactory: (
			session: TransactionalSession,
			repository: BookRepository,
			hotelService: HotelFacade,
			eventBus: EventBus
		) => new BookRoom(session, repository, hotelService, eventBus),
		inject: [
			"TransactionalSession",
			"BookRepository",
			"HotelFacade",
			"EventBus",
		],
	},
];
