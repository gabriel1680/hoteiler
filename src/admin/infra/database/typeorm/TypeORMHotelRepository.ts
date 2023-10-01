import { Repository } from "typeorm";

import { Hotel } from "src/admin/domain/Hotel";
import { HotelRepository } from "src/admin/domain/HotelRepository";
import { HotelEntity } from "./entities/HotelEntity";
import { Id } from "src/@kernel/domain/Id";
import { Address } from "src/admin/domain/Address";
import { HotelRoom } from "src/admin/domain/HotelRoom";
import { HotelRoomStatus } from "src/admin/domain/HotelRoomStatus";

export class TypeORMHotelRepository implements HotelRepository {
	constructor(private readonly repository: Repository<HotelEntity>) {}

	async save(hotel: Hotel): Promise<void> {
		const hotelData = this.repository.create({
			id: hotel.id.value,
			name: "some name",
			address: hotel.address.toString(),
			rooms_available: hotel.availableRooms,
			rooms_booked: hotel.bookedRooms,
			rooms: hotel.rooms.map((room) => ({
				id: room.id.value,
				number: room.number,
				price: room.price,
				status: room.status.value,
			})),
		});
		await this.repository.save(hotelData);
	}

	async get(id: string): Promise<Hotel> {
		const hotelData = await this.repository.findOne({
			where: { id },
			relations: {
				rooms: true,
			},
		});
		if (!hotelData) return null;
		return new Hotel(
			new Id(hotelData.id),
			Address.fromStr(hotelData.address),
			hotelData.rooms_available,
			hotelData.rooms_booked,
			hotelData.rooms.map(
				(room) =>
					new HotelRoom(
						new Id(room.id),
						room.number,
						room.price,
						new HotelRoomStatus(room.status)
					)
			)
		);
	}

	count(): Promise<number> {
		return this.repository.count();
	}
}
