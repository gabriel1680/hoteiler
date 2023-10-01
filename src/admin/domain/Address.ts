export class Address {
	constructor(
		public readonly country: string,
		public readonly street: string,
		public readonly zipcode: string
	) {}

	static fromStr(rawAddress: string): Address {
		const parsedAddress = rawAddress.split(";");
		return new Address(
			parsedAddress[0],
			parsedAddress[1],
			parsedAddress[2]
		);
	}

	equals(aAddress: Address): boolean {
		if (!aAddress) return false;
		if (!(aAddress instanceof Address)) return false;
		return this.compareProps(aAddress);
	}

	compareProps(aAddress: Address): boolean {
		return (
			aAddress.street === this.street &&
			aAddress.country === this.country &&
			aAddress.zipcode === this.zipcode
		);
	}

	toString() {
		return `${this.country};${this.street};${this.zipcode}`;
	}
}
