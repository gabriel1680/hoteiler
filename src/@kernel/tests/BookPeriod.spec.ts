import { BookPeriod } from "../domain/BookPeriod";

describe("BookPeriod (unit)", () => {
    let pastDate: Date;
    let futureDate: Date;

    beforeEach(() => {
        pastDate = new Date(2018, 11, 15);
        futureDate = new Date(2023, 11, 15);
    });

    it("should no be able to create a negative period", () => {
        expect(() => new BookPeriod(futureDate, pastDate));
    });

    it("should be able to convert to string", () => {
        const period = new BookPeriod(pastDate, futureDate);
        expect(`${period}`).toBe("2018-11-15 to 2023-11-15")
    });
});
