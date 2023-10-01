import { TransactionalSession } from "../../application/TransactionalSession";

export class InMemoryTransactionalSession implements TransactionalSession {
    async executeAtomically(operation: () => Promise<void>): Promise<void> {
        await operation();
    }
}

