import { UseCase } from "../../../@kernel/application/UseCase";
import { Hotel } from "../../domain/Hotel";
import { HotelRepository } from "../../domain/HotelRepository";

export class CreateHotel implements UseCase<Input, Output> {
	constructor(private readonly repository: HotelRepository) {}

	async execute(input: Input): Promise<void> {
		const hotel = Hotel.create(
			input.name,
			input.address,
			input.roomsAvailable,
			input.roomsBooked
		);
		await this.repository.save(hotel);
	}
}

type Input = {
	name: string;
	address: {
		country: string;
		street: string;
		zipcode: string;
	};
	roomsAvailable: number;
	roomsBooked: number;
};

type Output = void;
