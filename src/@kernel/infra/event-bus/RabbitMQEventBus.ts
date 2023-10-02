import amqp from "amqplib";

import { EventBus } from "src/@kernel/application/EventBus";
import { DomainEvent } from "src/@kernel/domain/DomainEvent";

export class RabbitMQEventBus implements EventBus {
    private amqpConnection: amqp.Connection;

    async connect(): Promise<void> {
        this.amqpConnection = await amqp.connect("amqp://localhost");
    }

    async register(event: string, handler: CallableFunction): Promise<void> {
        const channel = await this.amqpConnection.createChannel();
        await channel.assertQueue(event, { durable: true });
        channel.consume(event, async function (msg: any) {
            try {
                const input = JSON.parse(msg.content.toString());
                await handler(input);
                channel.ack(msg);
            } catch (error) {
                console.log("fail");
            }
        });
    }

    async publish(event: DomainEvent<object>): Promise<void> {
        const channel = await this.amqpConnection.createChannel();
        await channel.assertQueue(event.name, { durable: true });
        channel.sendToQueue(
            event.name,
            Buffer.from(JSON.stringify(event.getData()))
        );
    }
}
