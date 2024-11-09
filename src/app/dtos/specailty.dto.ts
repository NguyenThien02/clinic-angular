import {
    IsString, 
    IsNotEmpty, 
} from 'class-validator';

export class SpecailtyDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    constructor(data: any) {
        this.name = data.name;
    }
}