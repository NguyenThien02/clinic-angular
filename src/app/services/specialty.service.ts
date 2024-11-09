import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SpecialtyDetailResponse } from "../responses/specialtyDetail.response";
import { SpecailtyDTO } from "../dtos/specailty.dto";

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private apiSpecialty = `${environment.apiBaseUrl}/specialties`;

  constructor(private http: HttpClient) { }

  getAllSpecailties(): Observable<any> {
    return this.http.get<any[]>(this.apiSpecialty);
  }

  getSpecialtyDetail(id: number){
    return this.http.get(`${this.apiSpecialty}/detail/${id}`);
  }
  
  createSpecialty(specailtyDTO: SpecailtyDTO){
    return this.http.post(this.apiSpecialty, specailtyDTO);
  }

  updateSpecialty(specailtyId: number, specailtyDTO: SpecailtyDTO){
    return this.http.put(`${this.apiSpecialty}/${specailtyId}`, specailtyDTO);
  }

  deleteSpecialty(specailtyId: number){
    return this.http.delete(`${this.apiSpecialty}/${specailtyId}`);
  }
}