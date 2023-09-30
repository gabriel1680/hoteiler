import { Id } from "../../@kernel/domain/Id";
import { Address } from "./Address";
import { HotelRoom } from "./HotelRoom";

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

type AddressLike = {
    country: string;
    street: string;
    zipcode: string;
}

