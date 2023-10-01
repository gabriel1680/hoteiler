export abstract class DomainEvent<T> {
    readonly raisedAt: Date;

    abstract readonly name: string;

    constructor(private readonly data: T) {
        this.raisedAt = new Date();
    }

    getData() {
        return this.data;
    }
}

