import { HotelRoom } from "./HotelRoom";

export class Hotel {
    private _availableRooms: number;

    private _rooms: HotelRoom[];

    constructor(
        public readonly id: string,
        private _address: object,
        private _totalRooms: number
    ) {
        this._availableRooms = _totalRooms;
        this._rooms = [];
    }

    bookRooms(rooms: number) {
        this._availableRooms -= rooms;
        if (this._availableRooms < 0)
            throw new Error("cannot book more rooms than hotel capacity");
    }

    addRoom(number: number, price: number, status: string) {
        this._rooms.push(HotelRoom.create(number, price, status));
    }

    get address() {
        return this._address;
    }

    get totalRooms() {
        return this._totalRooms;
    }

    get availableRooms() {
        return this._availableRooms;
    }

    get rooms() {
        return [...this._rooms];
    }
}
