export interface TransactionalSession {
    executeAtomically(operation: () => Promise<void>): Promise<void>;
}
