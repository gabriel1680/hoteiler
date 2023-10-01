export interface HotelFacade {
    bookRoom(input: BookRoomInput): Promise<void>;
}

export type BookRoomInput = {
    hotelId: string;
    roomNumber: number;
    startDate: Date;
    endDate: Date;
};

