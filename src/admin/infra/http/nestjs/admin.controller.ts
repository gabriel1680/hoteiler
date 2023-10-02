import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from "@nestjs/common";

import { CreateHotel } from "src/admin/application/usecase/CreateHotel";
import { CreateHotelRoom } from "src/admin/application/usecase/CreateHotelRoom";
import { UpdateHotel } from "src/admin/application/usecase/UpdateHotel";

@Controller("/hotels")
export class AdminController {
    constructor(
        private readonly createHotel: CreateHotel,
        private readonly updateHotel: UpdateHotel,
        private readonly createRoom: CreateHotelRoom
    ) {}

    @Post()
    create(@Body() dto: any) {
        return this.createHotel.execute({
            name: dto.name,
            address: dto.address,
            roomsAvailable: dto.rooms_available,
            roomsBooked: dto.rooms_booked,
        });
    }

    @Put(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param("id") id: string, @Body() dto: any) {
        return this.updateHotel.execute({
            id,
            name: dto.name,
            address: dto.address,
            roomsAvailable: dto.rooms_available,
        });
    }

    @Post("/:hotelId/rooms")
    createHotelRoom(@Param("hotelId") hotelId: string, @Body() dto: any) {
        return this.createRoom.execute({ ...dto, hotelId });
    }
}
