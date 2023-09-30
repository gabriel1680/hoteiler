import { Id } from "../../@kernel/domain/Id";
import { BookPeriod } from "./BookPeriod";

export class Book {
     constructor(
        public readonly id: Id,
        public readonly roomId: string,
        public readonly period: BookPeriod,
    ) {}

    static create(roomId: string, startDate: Date, endDate: Date) {
        return new Book(
            Id.random(),
            roomId,
            new BookPeriod(startDate, endDate),
        );
    }
}
