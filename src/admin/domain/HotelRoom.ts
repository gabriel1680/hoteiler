import { Id } from "../../@kernel/domain/Id";
import { HotelRoomStatus } from "./HotelRoomStatus";

export class HotelRoom {
    constructor(
        public readonly id: Id,
        public readonly number: number,
        public readonly price: number,
        public status: HotelRoomStatus,
    ) {}

    static create(number: number, price: number, status: string) {
        return new HotelRoom(Id.random(), number, price, new HotelRoomStatus(status));
    }

    book() {
        if (!this.status.isAvailable())
            throw new Error("cannot book a unavailable room");
        this.status = this.status.toUnavailable();
    }

    isAvailable() {
        return this.status.isAvailable();
    }
}

