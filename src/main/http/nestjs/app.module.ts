import { Module } from "@nestjs/common";

import { AdminModule } from "src/admin/infra/http/nestjs/admin.module";
import { BookingModule } from "src/booking/infra/http/nestjs/booking.module";
import { SharedModule } from "src/@kernel/infra/http/nestjs/shared.module";

@Module({
    imports: [SharedModule.forRoot(), AdminModule, BookingModule],
})
export class AppModule {}
