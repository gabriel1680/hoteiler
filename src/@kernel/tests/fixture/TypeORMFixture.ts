import { DataSource } from "typeorm";

export class TypeORMFixture {
	static async createSqliteDataSource() {
		const ds = new DataSource({
			type: "sqlite",
			database: ":memory:",
			synchronize: true,
			entities: [__dirname + "/../../../**/entities/**/*.{js,ts}"],
			logging: ["error"],
		});
		await ds.initialize();
		return ds;
	}
}
