import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ProfileDTO } from "../dtos/profile.dto";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private apiProfile = `${environment.apiBaseUrl}/profiles`;

    constructor(private http: HttpClient) { }

    createProfile(profileDTO: ProfileDTO) {
        return this.http.post(`${this.apiProfile}`, profileDTO);
    }

    updateMoney(profileId: number, profileDTO: ProfileDTO){
        return this.http.put(`${this.apiProfile}/money/${profileId}`, profileDTO);
    }

    getProfilesByDoctorId(doctorId: number){
        return this.http.get(`${this.apiProfile}/doctor/${doctorId}`);
    }

    getProfilesByUserId(userId: number){
        return this.http.get(`${this.apiProfile}/user/${userId}`);
    }

    getProfileById(profileId: number){
        return this.http.get(`${this.apiProfile}/${profileId}`);
    }

    updateProfileById(profileId: number, profileDTO: ProfileDTO){
        return this.http.put(`${this.apiProfile}/${profileId}`, profileDTO);
    }

    deleteProfileById(profileId: number){
        return this.http.delete(`${this.apiProfile}/${profileId}`);
    }
}