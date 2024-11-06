import { ScheduleResponse } from "./schedule.response";


export interface ProfileResponse {
    id: number;
    schedule_response: ScheduleResponse;
    diagnosis: string;
    treatment: string;
    medications:string;
    total_money: number;
    total_insurance_money: number;    
}