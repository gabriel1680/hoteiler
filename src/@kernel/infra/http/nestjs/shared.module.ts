import { Module } from "@nestjs/common";
import { sharedProviders } from "./shared.providers";

@Module({})
export class SharedModule {
    static forRoot() {
        return {
            global: true,
            module: SharedModule,
            providers: sharedProviders,
            exports: sharedProviders,
        };
    }
}
