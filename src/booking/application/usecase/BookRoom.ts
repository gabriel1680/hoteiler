import { EventBus } from "../../../@kernel/application/EventBus";
import { TransactionalSession } from "../../../@kernel/application/TransactionalSession";
import { UseCase } from "../../../@kernel/application/UseCase";
import { HotelFacade } from "../../../admin/facade/HotelFacade";
import { Book } from "../../domain/Book";
import { BookRepository } from "../../domain/BookRepository";

export class BookRoom implements UseCase<Input, Output> {
    constructor(
        private readonly session: TransactionalSession,
        private readonly repository: BookRepository,
        private readonly hotelFacade: HotelFacade,
        private readonly eventBus: EventBus,
    ) {}

    async execute(input: Input): Promise<void> {
        const book = Book.create(input.hotelId, input.roomNumber, input.startDate, input.endDate);
        await this.session.executeAtomically(async () => {
            await this.hotelFacade.bookRoom(input);
            await this.repository.save(book);
        });
        await this.eventBus.publish(book.getEvent()!);
    }
}

type Input = {
    hotelId: string;
    roomNumber: number;
    startDate: Date;
    endDate: Date;
}

type Output = void;

