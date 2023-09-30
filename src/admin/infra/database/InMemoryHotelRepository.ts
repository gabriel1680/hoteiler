import { Hotel } from "../../domain/Hotel";
import { HotelRepository } from "../../domain/HotelRepository";

export class InMemoryHotelRepository implements HotelRepository {
    private readonly hotels: Hotel[] = [];

    async save(hotel: Hotel): Promise<void> {
        this.hotels.push(hotel);
    }

    async get(id: string): Promise<null | Hotel> {
        return this.hotels.find((hotel) => hotel.id.value === id) ?? null;
    }

    async count(): Promise<number> {
        return this.hotels.length;
    }
}
