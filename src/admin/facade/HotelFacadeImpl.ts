import { HotelRepository } from "../domain/HotelRepository";
import { RoomBook } from "../domain/RoomBook";
import { HotelFacade, BookRoomInput } from "./HotelFacade";

export class HotelFacadeImpl implements HotelFacade {
    constructor(private readonly repository: HotelRepository) {}

    async bookRoom(input: BookRoomInput): Promise<void> {
        const hotel = await this.repository.get(input.hotelId);
        if (!hotel)
            throw new Error(`hotel with ID: ${input.hotelId} not found`);
        const book = RoomBook.create(input.roomNumber, input.startDate, input.endDate);
        hotel.bookRoom(book);
        await this.repository.save(hotel);
    }
}

