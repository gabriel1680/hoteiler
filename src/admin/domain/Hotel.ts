import { Id } from "../../@kernel/domain/Id";
import { Address } from "./Address";
import { HotelRoom } from "./HotelRoom";
import { RoomBook } from "./RoomBook";

export class Hotel {
    constructor(
        public readonly id: Id,
        private _address: Address,
        private _availableRooms: number,
        private _bookedRooms: number,
        private _rooms: HotelRoom[] = []
    ) {}

    static create(aAddress: AddressLike, availableRooms: number, bookedRooms: number) {
        const address = new Address(aAddress.country, aAddress.street, aAddress.zipcode);
        return new Hotel(Id.random(), address, availableRooms, bookedRooms);
    }

    changeAddress(aAddress: AddressLike) {
        this._address = new Address(aAddress.country, aAddress.street, aAddress.zipcode);
    }

    changeAvailableRooms(rooms: number) {
        this._availableRooms = rooms;
    }

    addRoom(number: number, price: number, status: string) {
        this._rooms.push(HotelRoom.create(number, price, status));
    }

    bookRoom(book: RoomBook) {
        const room = this._rooms.find((r) => r.number === book.roomNumber);
        if (!room)
            throw new Error(`Room with number ${book.roomNumber} not found on hotel ${this.id.value}`);
        room.book(book.period);
        this._availableRooms--; 
        this._bookedRooms++;
    }

    get address() {
        return this._address;
    }

    get availableRooms() {
        return this._availableRooms;
    }

    get bookedRooms() {
        return this._bookedRooms;
    }

    get rooms() {
        return [...this._rooms];
    }
}

export type AddressLike = {
    country: string;
    street: string;
    zipcode: string;
}

