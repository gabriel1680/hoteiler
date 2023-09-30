import { Hotel } from "./Hotel";

export interface HotelRepository {
    save(hotel: Hotel): Promise<void>;
    get(id: string): Promise<null | Hotel>;
}
