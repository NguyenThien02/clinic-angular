import {
    IsString, 
    IsDate
} from 'class-validator';

export class UpdateUserDTO {
    @IsString()
    full_name: string;

    @IsString()
    address: string;

    @IsDate()
    birthday: Date;

    constructor(data: any) {
        this.full_name = data.full_name;
        this.address = data.address;
        this.birthday = data.birthDate;
    }
}