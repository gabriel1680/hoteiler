import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RoomEntity } from "./RoomEntity";

@Entity({ name: "hotels" })
export class HotelEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	address: string;

	@Column()
	rooms_available: number;

	@Column()
	rooms_booked: number;

	@OneToMany(() => RoomEntity, (room) => room.hotel, { cascade: true })
	rooms: RoomEntity[];
}
