import { Book } from "./Book";

export interface BookRepository {
    save(book: Book): Promise<void>;
    get(id: string): Promise<null | Book>;
}
