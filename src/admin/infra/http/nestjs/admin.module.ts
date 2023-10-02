import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { adminProviders } from "./admin.providers";

@Module({
    controllers: [AdminController],
    providers: adminProviders,
    exports: adminProviders,
})
export class AdminModule {}
