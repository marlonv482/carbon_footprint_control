import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoryDTO{
    @IsNotEmpty()
    @ApiProperty()
    category:string;
}