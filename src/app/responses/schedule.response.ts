import { TimeSlot } from "../models/TimeSlot";
import { DoctorResponse } from "./doctor.responses";
import { UserResponse } from "./user.responses";

export interface ScheduleResponse{
    id: number;
    user_name: string;
    user_phone: string;
    user_response:UserResponse;
    doctor_response: DoctorResponse
    date: Date;
    time_slot: TimeSlot;  
}