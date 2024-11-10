import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class ServiceDTO {
    @IsNotEmpty()
    specialty_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    insurance_price: number;


    constructor(data: any) {
        this.specialty_id = data.specialty_id;
        this.name = data.name;
        this.price = data.price;
        this.insurance_price = data.insurance_price;
    }
}