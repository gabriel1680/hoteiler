import { DataSource, Repository } from "typeorm";

import { TypeORMFixture } from "src/@kernel/tests/fixture/TypeORMFixture";
import { Book } from "src/booking/domain/Book";
import { TypeORMBookRepository } from "src/booking/infra/database/typeorm/TypeORMBookRepository";
import { BookEntity } from "src/booking/infra/database/typeorm/entities/BookEntity";

describe("TypeORMBookRepository (integration)", () => {
    let sut: TypeORMBookRepository;
    let connection: DataSource;
    let repository: Repository<BookEntity>;
    let book: Book;

    beforeAll(async () => {
        connection = await TypeORMFixture.createSqliteDataSource();
        repository = connection.getRepository(BookEntity);
        sut = new TypeORMBookRepository(repository);
    });

    beforeEach(async () => {
        await repository.clear();
        book = Book.create(
            "fcea8c85-f6f1-4500-86c3-df5cb398c6f3",
            103,
            new Date(2023, 4, 14),
            new Date(2023, 4, 20)
        );
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it("should create a book record", async () => {
        await sut.save(book);
        expect(await repository.count()).toBe(1);
    });

    it("should get a book record", async () => {
        await sut.save(book);
        const savedBook = await sut.get(book.id.value);
        expect(savedBook).toBeInstanceOf(Book);
    });
});
