import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CheckTimeSlotDTO } from "../dtos/checTimeSlot.dto";
import { ScheduleDTO } from "../dtos/schedule.dto";

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private apiSchedule = `${environment.apiBaseUrl}/schedules`;
    private apiCheckTimeSlot = `${environment.apiBaseUrl}/schedules/check_timeSlot`;

    constructor(private http: HttpClient) { }

    checkTimeSlot(checkTimeSlotDTO: CheckTimeSlotDTO) {
        return this.http.post(this.apiCheckTimeSlot, checkTimeSlotDTO);
    }

    createSchedule(scheduleDTO: ScheduleDTO){
        return this.http.post(this.apiSchedule,scheduleDTO);
    }

    getScheduleByUserId(userId: number, page: number, limit: number){
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<any[]>(`${this.apiSchedule}/user/${userId}`, {params});
    }

    getScheduleByDoctorId(doctorId: number, page: number, limit: number){
        const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
        return this.http.get<any[]>(`${this.apiSchedule}/doctor/${doctorId}`, {params});
    }

    deleteScheduleById(scheduleId: number){
        return this.http.delete (`${this.apiSchedule}/${scheduleId}`);
    }

    getScheduleById(scheduleId: number){
        return this.http.get (`${this.apiSchedule}/${scheduleId}`);
    }

    updateScheduleById(scheduleId:number, scheduleDTO: ScheduleDTO){
        return this.http.put(`${this.apiSchedule}/${scheduleId}`, scheduleDTO);
    }
}