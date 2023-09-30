import { Book } from "../domain/Book";

describe("Book (unit)", () => {
    it("should not be able to book a room when period is invalid", () => {
        expect(
            () => Book.create("1", new Date('2023-02-01'), new Date('2022-02-3'))
        ).toThrowError("invalid period");
    });
});

