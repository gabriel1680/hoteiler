import { EventBus } from "../../application/EventBus";
import { DomainEvent } from "../../domain/DomainEvent";

export class InMemoryEventBus implements EventBus {
    observers: Map<string, CallableFunction> = new Map();

    async register(event: string, handler: CallableFunction): Promise<void> {
        this.observers.set(event, handler);
    }

    async publish(event: DomainEvent<object>): Promise<void> {
        if (this.observers.has(event.name)) {
            const handler = this.observers.get(event.name);
            await handler(event);
        }
    }
}
