import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class ResourcesDTO{
    @IsNotEmpty()
    @ApiProperty()
    resource:string;

    @IsNotEmpty()
    @ApiProperty()
    unit:string

    @IsOptional()
    @ApiProperty()
    derivative:string
}
export class ResourcesUpdateDTO{
    @IsNotEmpty()
    @ApiProperty()
    resource:string;

    

  
}