import { EventBus } from "../../../@kernel/application/EventBus";
import { TransactionalSession } from "../../../@kernel/application/TransactionalSession";
import { InMemoryTransactionalSession } from "../../../@kernel/infra/database/InMemoryTransactionalSession";
import { HotelFacade } from "../../../admin/facade/HotelFacade";
import { BookRoom } from "../../application/usecase/BookRoom";
import { BookRepository } from "../../domain/BookRepository";
import { InMemoryBookRepository } from "../../infra/database/InMemoryBookRepository";
import { InMemoryEventBus } from "../../../@kernel/infra/event-bus/InMemoryEventBus";

describe("BookRoom (narrow integration)", () => {
    let sut: BookRoom;
    let facade: jest.Mocked<HotelFacade>;
    let session: TransactionalSession;
    let eventBus: EventBus;
    let repository: BookRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        facade = {
            bookRoom: jest.fn(),
        };
        session = new InMemoryTransactionalSession();
        eventBus = new InMemoryEventBus();
        repository = new InMemoryBookRepository();
        sut = new BookRoom(
            session,
            repository,
            facade,
            eventBus,
        );
    });

    it("should be able to book a hotel room", async () => {
        const eventHandlerSpy = jest.fn();
        await eventBus.register("RoomBooked", eventHandlerSpy);
        const input = {
            hotelId: "8e933749-7e5d-4a86-adf2-8fdbf21f74c3",
            roomNumber: 102,
            startDate: new Date(2022, 11, 15),
            endDate: new Date(2022, 11, 19),
        };
        await sut.execute(input);
        expect(await repository.count()).toBe(1);
        expect(eventHandlerSpy).toHaveBeenCalled();
        expect(facade.bookRoom).toHaveBeenCalled();
    });
});
