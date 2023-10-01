import { Id } from "../../@kernel/domain/Id";
import { BookPeriod } from "../../@kernel/domain/BookPeriod";
import { HotelRoomStatus } from "./HotelRoomStatus";

export class HotelRoom {
    constructor(
        public readonly id: Id,
        public readonly number: number,
        public readonly price: number,
        public status: HotelRoomStatus,
        private readonly bookedPeriods: BookPeriod[] = [],
    ) {}

    static create(number: number, price: number, status: string) {
        return new HotelRoom(Id.random(), number, price, new HotelRoomStatus(status));
    }

    book(period: BookPeriod) {
        if (!this.status.isAvailable())
            throw new Error("cannot book a unavailable room");
        if (!this.isAvailableOn(period))
            throw new Error(`Room ${this.number} is already book at period ${period}`);
        this.bookedPeriods.push(period);
    }

    isAvailable() {
        return this.status.isAvailable();
    }

    private isAvailableOn(period: BookPeriod) {
        for (const bookedPeriod of this.bookedPeriods)
            if (bookedPeriod.equals(period)) return false;
        return true;
    }

    getBookedPeriods() {
        return [...this.bookedPeriods];
    }
}

