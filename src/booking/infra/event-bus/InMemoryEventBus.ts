import { EventBus } from "../../../@kernel/application/EventBus";
import { DomainEvent } from "../../../@kernel/domain/DomainEvent";

export class InMemoryEventBus implements EventBus {

    observers: Map<string, CallableFunction> = new Map();

    async register(event: string, handler: CallableFunction): Promise<void> {
        this.observers.set(event, handler);
    }

    async publish(event: DomainEvent<object>): Promise<void> {
        const handler = this.observers.get(event.name);
        if (handler)
            await handler(event);
    }
}
