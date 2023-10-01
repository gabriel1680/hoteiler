import { TypeORMFixture } from "src/@kernel/tests/fixture/TypeORMFixture";
import { Hotel } from "src/admin/domain/Hotel";
import { TypeORMHotelRepository } from "src/admin/infra/database/typeorm/TypeORMHotelRepository";
import { HotelEntity } from "src/admin/infra/database/typeorm/entities/HotelEntity";
import { DataSource, Repository } from "typeorm";

describe("TypeORMHotelRepository (integration)", () => {
	let sut: TypeORMHotelRepository;
	let connection: DataSource;
	let repository: Repository<HotelEntity>;
	let hotel: Hotel;

	beforeAll(async () => {
		connection = await TypeORMFixture.createSqliteDataSource();
		repository = connection.getRepository(HotelEntity);
		sut = new TypeORMHotelRepository(repository);
	});

	beforeEach(async () => {
		await repository.clear();
		hotel = Hotel.create(
			"admin@user.com",
			{ country: "country", street: "street", zipcode: "123" },
			2,
			1
		);
		hotel.addRoom(102, 159, "AVAILABLE");
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it("should create a hotel", async () => {
		await sut.save(hotel);
		expect(await repository.count()).toBe(1);
	});

	it("should get  hotel", async () => {
		await sut.save(hotel);
		const hotelCreated = await sut.get(hotel.id.value);
		expect(hotelCreated.rooms).toHaveLength(1);
	});
});
