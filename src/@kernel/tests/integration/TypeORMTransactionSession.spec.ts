import { DataSource, Repository } from "typeorm";

import { TypeORMTransactionSession } from "src/@kernel/infra/database/typeorm/TypeORMTransactionalSession";
import { TypeORMFixture } from "src/@kernel/tests/fixture/TypeORMFixture";
import { Hotel } from "src/admin/domain/Hotel";
import { HotelRepository } from "src/admin/domain/HotelRepository";
import { TypeORMHotelRepository } from "src/admin/infra/database/typeorm/TypeORMHotelRepository";
import { HotelEntity } from "src/admin/infra/database/typeorm/entities/HotelEntity";

describe("TypeORMTransactionSessionRepository (integration)", () => {
    let sut: TypeORMTransactionSession;
    let connection: DataSource;
    let hotelRepository: HotelRepository;
    let repository: Repository<HotelEntity>;
    let hotel: Hotel;

    beforeAll(async () => {
        connection = await TypeORMFixture.createSqliteDataSource();
        sut = new TypeORMTransactionSession(connection);
        repository = connection.getRepository(HotelEntity);
        hotelRepository = new TypeORMHotelRepository(repository);
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

    it("should rollback operation (guarantee atomicity)", async () => {
        await sut.executeAtomically(async () => {
            await hotelRepository.save(hotel);
            throw new Error();
        });
        expect(await repository.count()).toBe(0);
    });
});
