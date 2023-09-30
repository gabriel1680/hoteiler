export class BookPeriod {
    constructor(
        public readonly startDate: Date,
        public readonly endDate: Date,
    ) {
        if (endDate.getTime() <= startDate.getTime())
            throw new Error("invalid period");
    }
}
