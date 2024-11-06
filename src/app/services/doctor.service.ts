import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DoctorResponse } from "../responses/doctor.responses";
import { DoctorDTO } from "../dtos/doctor.dto";
import { Observable } from "rxjs";

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
  getDoctorByUserId(userId: number){
    return this.http.get(`${this.apiDoctor}/${userId}`)
  }

  saveDoctorResponseToLocalStorage(doctorResponse?: DoctorResponse) {
    try {
      debugger
      if (doctorResponse == null || !doctorResponse) {
        return;
      }
      const doctorResponseJSON = JSON.stringify(doctorResponse);
      localStorage.setItem('doctor', doctorResponseJSON);
      console.log('Thông tin bác sĩ đã được lưu vào bộ nhớ cục bộ.');
    } catch (error) {
      console.error('Lỗi khi lưu bác sĩ vào bộ nhớ cục bộ:', error);
    }
  }

  getDoctorResponseFromLocalStorage() {
    try {
      const doctorResponseJSON = localStorage.getItem('doctor');
      if (doctorResponseJSON == null || doctorResponseJSON == undefined) {
        return null;
      }
      const doctorResponse = JSON.parse(doctorResponseJSON!);
      console.log('Thông tin bác sĩ được lấy từ bộ nhớ cục bộ.');
      return doctorResponse;
    } catch (error) {
      console.error('Lỗi khi lấy thông của bác sĩ từ bộ nhớ cục bộ:', error);
      return null;
    }
  }

  deleteDoctorById(id: number){
    return this.http.delete<any>( `${this.apiDoctor}/${id}`);
  }

  registerDoctor(doctorDTO: DoctorDTO){
    return this.http.post(`${this.apiDoctor}/register`, doctorDTO);
  }

  updateDoctor(doctorId: number, doctorDTO: DoctorDTO){
    return this.http.put(`${this.apiDoctor}/${doctorId}`, doctorDTO);
  }

  uploadDoctorImage(doctorId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiDoctor}/upload/${doctorId}`, formData);
  }
}