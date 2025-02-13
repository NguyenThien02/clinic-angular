import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimeSlotService{
    private apiGetTimeSlot  = `${environment.apiBaseUrl}/time-slots`;

    constructor(private http: HttpClient){}
    
    getTimeSlots(): Observable<any>{
        return this.http.get<any[]>(this.apiGetTimeSlot)
    }
}