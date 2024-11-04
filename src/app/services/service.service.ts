import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

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
        return this.http.get<any[]>(this.apiServices, { params });
    }
}