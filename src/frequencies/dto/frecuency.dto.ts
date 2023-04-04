import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FrecuencyDTO{
    @IsNotEmpty()
    @ApiProperty()
    frecuency:string
}