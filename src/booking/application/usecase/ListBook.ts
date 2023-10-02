import { DataSource } from "typeorm";

import { UseCase } from "src/@kernel/application/UseCase";

export class ListBook implements UseCase<Input, Output> {
    constructor(private readonly dataSource: DataSource) {}

    execute(input: Input): Promise<Output> {
        return this.dataSource.query(
            "SELECT b.id, hr.number, hr.status FROM book AS b LEFT JOIN rooms as hr ON h.number = b.number WHERE hotel_id = $1",
            [input.hotelId]
        );
    }
}

type Input = { hotelId: string };

type Output = { id: string; number: number; status: "UNAVAILABLE" };
