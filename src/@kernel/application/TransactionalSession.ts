export interface TransactionalSession {
    executeAtomicaly(operation: () => Promise<void>): Promise<void>;
}
