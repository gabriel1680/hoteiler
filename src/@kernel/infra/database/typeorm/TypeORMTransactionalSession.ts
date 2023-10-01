import { DataSource } from "typeorm";

import { TransactionalSession } from "src/@kernel/application/TransactionalSession";

export class TypeORMTransactionSession implements TransactionalSession {
	constructor(private readonly dataSource: DataSource) {}

	async executeAtomically(operation: () => Promise<void>): Promise<void> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			await operation();
			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
}
