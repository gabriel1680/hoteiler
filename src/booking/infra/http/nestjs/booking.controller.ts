import { Body, Controller, Get, Param, Post } from "@nestjs/common";

import { BookRoom } from "src/booking/application/usecase/BookRoom";
import { ListBook } from "src/booking/application/usecase/ListBook";

@Controller("/book")
export class BookingController {
    constructor(
        private readonly bookRoom: BookRoom,
        private readonly listBook: ListBook
    ) {}

    @Post("/:hotelId")
    create(@Param("hotelId") hotelId: string, @Body() dto: any) {
        return this.bookRoom.execute({
            hotelId,
            endDate: dto.end_date,
            startDate: dto.start_date,
            roomNumber: dto.room_number,
        });
    }

    @Get("/:hotelId")
    get(@Param("hotelId") hotelId: string) {
        return this.listBook.execute({ hotelId });
    }
}
