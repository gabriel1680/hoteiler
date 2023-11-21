# hoteiler

A modular monolith app, builted using TDD and DDD. The main goal is to create a hotelier rest api with typescript that has two contexts:

1. the admin context, to manage the hotels and their rooms;
2. the client context, to book the available rooms on hotels;

This solution uses RabbitMQ for the messaging system and domain events to communicate the changes between the contexts.
