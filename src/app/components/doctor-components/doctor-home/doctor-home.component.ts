import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { UserResponse } from 'src/app/responses/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.scss']
})
export class DoctorHomeComponent {
  userResponse?: UserResponse;
  userId: number = 0;
  doctorResponse?: DoctorResponse;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.getUserResponse()
    this.getDoctorResponse();
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }

  getDoctorResponse(){
    this.doctorService.getDoctorByUserId(this.userId).subscribe({
      next: (response: any) => {
        debugger
        response.image_url = `${environment.apiBaseUrl}/doctors/images/${response.image_url}`;
        this.doctorResponse = response;
        this.doctorService.saveDoctorResponseToLocalStorage(this.doctorResponse);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error:', error);
      }
    })
  }
}
