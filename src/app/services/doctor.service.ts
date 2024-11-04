import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiDoctor = `${environment.apiBaseUrl}/doctors`;

  constructor(private http: HttpClient) { }

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('specialty_id', selectedSpecialtyId);
    return this.http.get<any[]>(this.apiDoctor, { params });
  }

  getDoctorById(doctorId: number){
    debugger
    return this.http.get(`${this.apiDoctor}/${doctorId}`)
  }

}