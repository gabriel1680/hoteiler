import { BookPeriod } from "../../booking/domain/BookPeriod";

export class RoomBook {
     constructor(
        public readonly roomNumber: number,
        public readonly period: BookPeriod,
    ) {}

    static create(roomNumber: number, startDate: Date, endDate: Date) {
        return new RoomBook(roomNumber, new BookPeriod(startDate, endDate));
    }
}

