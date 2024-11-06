import {
    IsNotEmpty, 
    IsDate
} from 'class-validator';

export class CheckTimeSlotDTO {

    @IsNotEmpty()
    doctor_id: number;

    @IsDate()
    date: Date;

    constructor(data: any) {
        this.doctor_id = data.doctor_id;
        this.date = data.date;
    }
}