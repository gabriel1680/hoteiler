import { Address } from "../domain/Address";

describe("Address (unit)", () => {
    let address: Address;

    beforeEach(() => {
        address = new Address("country", "street", "123456");
    });

    it.each([
        null,
        {},
        { country: "country", street: "street", zipcode: "123456" },
        new Address("country1", "street", "123456")
    ])
    ("should be able to compare addresses", (addr) => {
        // @ts-expect-error - invalid types
        expect(address.equals(addr)).toBeFalsy();
    });

    it("should be able to compare different addresses", () => {
        const addr = new Address("country", "street", "123456");
        expect(address.equals(addr)).toBeTruthy();
    });
});
