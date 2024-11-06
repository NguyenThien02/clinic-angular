
import { DoctorResponse } from "../responses/doctor.responses";
import { UserResponse } from "../responses/user.responses";
import { TimeSlot } from "./TimeSlot";

export interface Schedule{
    id: number;
    user_name: string;
    user_phone: string;
    user_response: UserResponse;
    doctor_response: DoctorResponse;
    date: Date;
    time_slot: TimeSlot;
    
}