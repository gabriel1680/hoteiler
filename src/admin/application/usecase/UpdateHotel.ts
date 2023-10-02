import { UseCase } from "../../../@kernel/application/UseCase";
import { HotelRepository } from "../../domain/HotelRepository";

export class UpdateHotel implements UseCase<Input, Output> {
    constructor(private readonly repository: HotelRepository) {}

    async execute(input: Input): Promise<void> {
        const hotel = await this.repository.get(input.id);
        if (hotel === null)
            throw new Error(`Hotel with Id: ${input.id} not found`);
        hotel.changeAddress(input.address);
        hotel.changeAvailableRooms(input.roomsAvailable);
        await this.repository.save(hotel);
    }
}

type Input = {
    id: string;
    name: string;
    address: {
        country: string;
        street: string;
        zipcode: string;
    };
    roomsAvailable: number;
};

type Output = void;
