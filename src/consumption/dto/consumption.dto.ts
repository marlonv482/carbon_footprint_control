import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ConsumptionTDO{
    @IsNotEmpty()
    @ApiProperty()
    date:string;

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    amount:number;

    @IsNotEmpty()
    @ApiProperty()
    activity: string;  
}