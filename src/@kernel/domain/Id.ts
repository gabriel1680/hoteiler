import { randomUUID } from "node:crypto";

export class Id {
    constructor(public readonly value: string) {
        const test = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
        if (!value || !test.test(value))
            throw new Error("invalid Id");
    }

    static random(): Id {
        return new Id(randomUUID());
    }
}
