export class HotelRoomStatus {
    constructor(public readonly value: string) {
        // @ts-expect-error - string is not enum
        if (!value || !Object.values(HotelRoomStatuses).includes(value))
            throw new Error("invalid hotel room status");
    }

    isAvailable(): boolean {
        return this.value === HotelRoomStatuses.AVAILABLE;
    }

    toUnavailable(): HotelRoomStatus {
        return new HotelRoomStatus(HotelRoomStatuses.UNAVAILABLE);
    }
}

export enum HotelRoomStatuses {
    AVAILABLE = "AVAILABLE",
    UNAVAILABLE = "UNAVAILABLE",
}
