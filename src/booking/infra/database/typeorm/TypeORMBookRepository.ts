import { Repository } from "typeorm";

import { BookPeriod } from "src/@kernel/domain/BookPeriod";
import { Id } from "src/@kernel/domain/Id";
import { Book } from "src/booking/domain/Book";
import { BookRepository } from "src/booking/domain/BookRepository";
import { BookEntity } from "./entities/BookEntity";

export class TypeORMBookRepository implements BookRepository {
	constructor(private readonly repository: Repository<BookEntity>) {}

	async save(book: Book): Promise<void> {
		const bookData = this.repository.create({
			id: book.id.value,
			hotel_id: book.hotelId.value,
			room_number: book.roomNumber,
			start_date: book.period.startDate,
			end_date: book.period.endDate,
		});
		await this.repository.save(bookData);
	}

	async get(id: string): Promise<Book> {
		const bookData = await this.repository.findOneBy({ id });
		if (!bookData) return null;
		return new Book(
			new Id(bookData.id),
			new Id(bookData.hotel_id),
			bookData.room_number,
			new BookPeriod(bookData.start_date, bookData.end_date)
		);
	}

	count(): Promise<number> {
		return this.repository.count();
	}
}
