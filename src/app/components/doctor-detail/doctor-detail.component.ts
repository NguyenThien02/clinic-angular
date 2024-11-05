import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit{
  doctorResponse?: DoctorResponse;
  userId: number = 0;

  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {
    this.getUserId();
    this.getDoctorResponse();
  }
  getUserId() {
    debugger
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    if (userIdParam !== null) {
      const userId = +userIdParam;  // Chuyển thành số nếu không null
      this.userId = userId;
    } else {
      console.warn('doctor ID không tồn tại trong route parameters');
    }
  }
  getDoctorResponse(){
    this.doctorService.getDoctorByUserId(this.userId).subscribe({
      next: (response: any) => {
        debugger
        response.image_url = `${environment.apiBaseUrl}/doctors/images/${response.image_url}`;
        this.doctorResponse = response;
      },
      error: (error: any) => {
        debugger;
        console.error('Error:', error);
      }
    })
  }
}
