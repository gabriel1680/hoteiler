import { Inject, Module, OnModuleDestroy } from "@nestjs/common";
import { DataSource } from "typeorm";

import { AdminModule } from "src/admin/infra/http/nestjs/admin.module";
import { BookingModule } from "src/booking/infra/http/nestjs/booking.module";
import { SharedModule } from "src/@kernel/infra/http/nestjs/shared.module";

@Module({
    imports: [SharedModule.forRoot(), AdminModule, BookingModule],
})
export class AppModule implements OnModuleDestroy {
    constructor(
        @Inject("DataSource") private readonly dataSource: DataSource
    ) {}

    async onModuleDestroy() {
        await this.dataSource.destroy();
    }
}
