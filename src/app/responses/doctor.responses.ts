import { Specialty } from "../models/Specialty";
import { UserResponse } from "./user.responses";

export interface DoctorResponse {
    id: number;
    specialty: Specialty;
    training_process: string;
    job_description: string;
    image_url:string;
    user_response: UserResponse;    
}