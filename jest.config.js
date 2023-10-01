/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	moduleNameMapper: {
		"^src(.*)$": "<rootDir>/src/$1",
	},
	testEnvironment: "node",
};
