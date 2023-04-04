import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UnitDTO{
    @IsNotEmpty()
    @ApiProperty()
    unit:string
}