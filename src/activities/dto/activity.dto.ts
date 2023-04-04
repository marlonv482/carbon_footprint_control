import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class ActivityDTO{
    @IsNotEmpty()
    @ApiProperty()
    activity_description:string;

    @IsNotEmpty()
    @ApiProperty()
    category:string

    @IsNotEmpty()
    @ApiProperty()
    resource:string

    @IsNotEmpty()
    @ApiProperty()
    frecuency:string

    @IsOptional()
    @ApiProperty()
    emision:string

}