import { Module } from "@nestjs/common";
import { AdminModule } from "src/admin/infra/http/nestjs/admin.module";
import { BookingModule } from "src/booking/infra/http/nestjs/booking.module";

@Module({ imports: [AdminModule, BookingModule] })
export class AppModule {}
