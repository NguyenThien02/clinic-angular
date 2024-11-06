import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ProfileDetailDTO } from "../dtos/profileDetail.dto";

@Injectable({
    providedIn: 'root'
  })
  export class ProfileDetailService {
    private apiProfileDetail = `${environment.apiBaseUrl}/profileDetails`;
  
    constructor(private http: HttpClient) { }
  
    createProfileDetails(profileDetailDTO: ProfileDetailDTO) {
      return this.http.post(this.apiProfileDetail, profileDetailDTO);
    }

    getServicesByProfileId(profileId: number){
      return this.http.get(`${this.apiProfileDetail}/${profileId}`);
    }
  }