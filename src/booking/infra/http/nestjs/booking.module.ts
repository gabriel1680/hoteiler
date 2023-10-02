import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { bookingProviders } from "./booking.providers";
import { AdminModule } from "src/admin/infra/http/nestjs/admin.module";

@Module({
    imports: [AdminModule],
    controllers: [BookingController],
    providers: bookingProviders,
})
export class BookingModule {}
