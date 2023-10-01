import { DomainEvent } from "../domain/DomainEvent";

export interface EventBus {
    register(event: string, handler: CallableFunction): Promise<void>;
    publish(event: DomainEvent<object>): Promise<void>
}

