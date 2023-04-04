import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class EmisionDTO{
    @IsNotEmpty()
    @ApiProperty()
    emision:string;
}