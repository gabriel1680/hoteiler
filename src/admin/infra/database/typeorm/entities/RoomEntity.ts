import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { HotelEntity } from "./HotelEntity";

@Entity({ name: "rooms" })
export class RoomEntity {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    hotel_id: string;

    @Column()
    number: number;

    @Column()
    price: number;

    @Column()
    status: string;

    @ManyToOne(() => HotelEntity, (hotel) => hotel.rooms, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ referencedColumnName: "id", name: "hotel_id" })
    hotel: HotelEntity;
}
