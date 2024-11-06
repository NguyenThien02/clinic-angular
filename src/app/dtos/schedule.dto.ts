import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class ScheduleDTO {
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    @IsString()
    user_name: string;

    @IsPhoneNumber()
    @IsString()
    user_phone: string;

    @IsNotEmpty()
    doctor_id: number;

    @IsDate()
    date: Date;

    @IsNotEmpty()
    time_slot_id: number;

    constructor(data: any) {
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.user_phone = data.user_phone;
        this.doctor_id = data.doctor_id;
        this.date = data.date;
        this.time_slot_id = data.time_slot_id;
    }
}