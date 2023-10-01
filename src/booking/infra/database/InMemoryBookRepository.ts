import { Book } from "../../domain/Book";
import { BookRepository } from "../../domain/BookRepository";

export class InMemoryBookRepository implements BookRepository {
    private books: Book[] = [];

    async save(book: Book): Promise<void> {
        this.books.push(book);
    }

    async get(id: string): Promise<Book | null> {
        return this.books.find((book) => book.id.value === id) ?? null;
    }

    async count(): Promise<number> {
        return this.books.length;
    }
}
