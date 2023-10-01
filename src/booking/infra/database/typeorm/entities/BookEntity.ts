import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "books" })
export class BookEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column()
	hotel_id: string;

	@Column()
	room_number: number;

	@Column()
	start_date: Date;

	@Column()
	end_date: Date;
}
