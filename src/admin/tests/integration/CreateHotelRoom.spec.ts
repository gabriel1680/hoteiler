import { CreateHotelRoom } from "../../application/usecase/CreateHotelRoom";
import { AddressLike, Hotel } from "../../domain/Hotel";
import { HotelRepository } from "../../domain/HotelRepository";
import { InMemoryHotelRepository } from "../../infra/database/InMemoryHotelRepository";

describe("CreateHotelRoom (narrow integration)", () => {
	let address: AddressLike;
	let repository: HotelRepository;
	let sut: CreateHotelRoom;

	beforeEach(() => {
		address = {
			country: "country",
			street: "street",
			zipcode: "1233456",
		};
		repository = new InMemoryHotelRepository();
		sut = new CreateHotelRoom(repository);
	});

	it("should not create a hotel room when hotel does not exists", async () => {
		const createHotelRoomData = {
			hotelId: "invalid id",
			number: 101,
			price: 12,
			status: "AVAILABLE",
		};
		await expect(sut.execute(createHotelRoomData)).rejects.toThrowError();
	});

	it("should be able to create a hotel room", async () => {
		const hotelId = await addHotelTorepository();
		const createHotelRoomData = {
			hotelId,
			number: 101,
			price: 12,
			status: "AVAILABLE",
		};
		await sut.execute(createHotelRoomData);
		const hotel = await repository.get(hotelId);
		expect(hotel!.rooms).toHaveLength(1);
	});

	async function addHotelTorepository() {
		const hotel = Hotel.create("admin@user.com", address, 1, 1);
		await repository.save(hotel);
		return hotel.id.value;
	}
});
