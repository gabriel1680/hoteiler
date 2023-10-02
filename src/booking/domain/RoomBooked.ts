import { DomainEvent } from "../../@kernel/domain/DomainEvent";

export class RoomBooked extends DomainEvent<RoomBookedData> {
    name = "RoomBooked";
}

export type RoomBookedData = {
    id: string;
    hotelId: string;
    roomNumber: number;
    startDate: Date;
    endDate: Date;
};
