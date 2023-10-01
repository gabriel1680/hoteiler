import { Id } from "../../@kernel/domain/Id";
import { BookPeriod } from "../../@kernel/domain/BookPeriod";
import { RoomBooked } from "./RoomBooked";

export class Book {
    private event?: RoomBooked;

     constructor(
        public readonly id: Id,
        public readonly hotelId: Id,
        public readonly roomNumber: number,
        public readonly period: BookPeriod,
    ) {}

    static create(hotelId: string, roomNumber: number, startDate: Date, endDate: Date) {
        const book = new Book(
            Id.random(),
            new Id(hotelId),
            roomNumber,
            new BookPeriod(startDate, endDate),
        );
        book.event = new RoomBooked({
            id: book.id.value,
            hotelId: book.hotelId.value,
            roomNumber: book.roomNumber,
            startDate: book.period.startDate,
            endDate: book.period.endDate,
        });
        return book;
    }

    getEvent() {
        return this.event;
    }
}
