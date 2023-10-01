export class BookPeriod {
    constructor(
        public readonly startDate: Date,
        public readonly endDate: Date,
    ) {
        if (endDate.getTime() <= startDate.getTime())
            throw new Error("invalid period");
    }

    equals(period: BookPeriod): boolean {
        if (!period) return false;
        if (!(period instanceof BookPeriod)) return false;
        return this.compareDates(period);
    }

    private compareDates(period: BookPeriod): boolean {
        return this.startDate === period.startDate 
            && this.endDate === period.endDate;
    }

    toString() {
        return `${this.dateToString(this.startDate)} to ${this.dateToString(this.endDate)}`;
    }

    private dateToString(date: Date) {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
}

