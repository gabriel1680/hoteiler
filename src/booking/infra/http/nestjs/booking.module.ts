import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { bookingProviders } from "./booking.providers";

@Module({ controllers: [BookingController], providers: bookingProviders })
export class BookingModule {}
