import { UseCase } from "../../../@kernel/application/UseCase";
import { HotelRepository } from "../../domain/HotelRepository";

export class CreateHotelRoom implements UseCase<Input, Output> {
    constructor(private readonly repository: HotelRepository) {}

    async execute(input: Input): Promise<void> {
        const hotel = await this.repository.get(input.hotelId);
        if (hotel === null)
            throw new Error(`Hotel with Id: ${input.hotelId} not found`);
        hotel.addRoom(input.number, input.price, input.status);
        await this.repository.save(hotel);
    }
}

type Input = {
    hotelId: string;
    number: number;
    price: number;
    status: string;
}

type Output = void;
