import { Id } from "../domain/Id";

describe("Id (unit)", () => {
    it("should be able to create a random id", () => {
        const id = Id.random();
        expect(id.value).toBeDefined();
    });

    it("should be able to create a id from uuid", () => {
        const id = new Id("8e933749-7e5d-4a86-adf2-8fdbf21f74c3");
        expect(id.value).toBeDefined();
    });

    it("should not be able to create a invalid Id", () => {
        expect(() => new Id(" ")).toThrowError("invalid Id");
    });
});
