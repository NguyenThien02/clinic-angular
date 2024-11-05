import {
    IsString, 
    IsDate
} from 'class-validator';

export class PassWordDTO {
    @IsString()
    password: string;

    @IsString()
    new_password: string;

    @IsDate()
    retype_new_password: string;

    constructor(data: any) {
        this.password = data.password;
        this.new_password = data.new_password;
        this.retype_new_password = data.retype_new_password;
    }
}