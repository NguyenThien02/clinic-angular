import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ServiceDTO } from "../dtos/service.dto";

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private apiServices = `${environment.apiBaseUrl}/services`;

    constructor(private http: HttpClient) { }

    getServices(
        page: number,
        limit: number,
        selectedSpecialtyId: number
    ): Observable<any> {
        const params = new HttpParams()
            .set('specialty_id', selectedSpecialtyId)
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<any[]>(`${this.apiServices}/all`, { params });
    }

    getServicesByIds(selectServiceId: number[]){
        return this.http.post(`${this.apiServices}/by-ids`, selectServiceId);
    }

    createService(serviceDTO: ServiceDTO){
        return this.http.post(this.apiServices, serviceDTO);
    }

    deleteServiceById(serviceId: number){
        return this.http.delete(`${this.apiServices}/${serviceId}`);
    }

    updateService(id: number, serviceDTO: ServiceDTO){
        return this.http.put(`${this.apiServices}/${id}`, serviceDTO);
    }

    getServiceDetail(id: number, month: number){
        const params = new HttpParams()
            .set('month', month);
        return this.http.get<any[]>(`${this.apiServices}/detail/${id}`,{ params });
    }
}