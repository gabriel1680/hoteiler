import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";

import { TypeORMHotelRepository } from "../../database/typeorm/TypeORMHotelRepository";
import { HotelEntity } from "../../database/typeorm/entities/HotelEntity";
import { CreateHotel } from "src/admin/application/usecase/CreateHotel";
import { HotelRepository } from "src/admin/domain/HotelRepository";
import { UpdateHotel } from "src/admin/application/usecase/UpdateHotel";
import { CreateHotelRoom } from "src/admin/application/usecase/CreateHotelRoom";

export const adminProviders: Provider[] = [
	{
		provide: "HotelRepository",
		useFactory: (connection: DataSource) =>
			new TypeORMHotelRepository(connection.getRepository(HotelEntity)),
		inject: ["DataSource"],
	},
	{
		provide: CreateHotel,
		useFactory: (repository: HotelRepository) =>
			new CreateHotel(repository),
		inject: ["HotelRepository"],
	},
	{
		provide: UpdateHotel,
		useFactory: (repository: HotelRepository) =>
			new UpdateHotel(repository),
		inject: ["HotelRepository"],
	},
	{
		provide: CreateHotelRoom,
		useFactory: (repository: HotelRepository) =>
			new CreateHotelRoom(repository),
		inject: ["HotelRepository"],
	},
];
