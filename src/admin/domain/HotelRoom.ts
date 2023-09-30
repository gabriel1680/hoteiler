import crypto from "node:crypto";

export class HotelRoom {
    constructor(
        public readonly id: string,
        public readonly number: number,
        public readonly price: number,
        public status: string,
    ) {}

    static create(number: number, price: number, status: string) {
        return new HotelRoom(crypto.randomUUID(), number, price, status);
    }

    book() {
        if (this.status === "UNAVAILABLE")
            throw new Error("cannot book a unavailable room");
        this.status = "UNAVAILABLE";
    }
}
