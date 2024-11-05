import {
    IsString, 
    IsNotEmpty, 
    IsPhoneNumber, 
    IsDate
} from 'class-validator';

export class DoctorDTO {

    user_id: number;

    @IsNotEmpty()
    specialty_id: number;

    @IsString()
    @IsNotEmpty()
    training_process: string;

    @IsString()
    @IsNotEmpty()
    job_description: string;

    constructor(data: any) {
        this.user_id = data.doctor_id;
        this.specialty_id = data.specialty_id
        this.training_process = data.training_process;
        this.job_description = data.job_description;
    }
}