import {
    IsString, 
    IsNotEmpty, 
} from 'class-validator';

export class ProfileDTO {
    
    schedule_id: number;

    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @IsString()
    @IsNotEmpty()
    treatment: string;

    @IsString()
    @IsNotEmpty()
    medications: string;

    total_money: number;

    total_insurance_money: number;

    constructor(data: any) {
        this.schedule_id = data.schedule_id;
        this.diagnosis = data.diagnosis;
        this.treatment = data.treatment;
        this.medications = data.medications;
        this.total_money = data.total_money;
        this.total_insurance_money = data.total_insurance_money;
    }
}