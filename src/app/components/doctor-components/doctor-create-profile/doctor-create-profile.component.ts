import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-doctor-create-profile',
  templateUrl: './doctor-create-profile.component.html',
  styleUrls: ['./doctor-create-profile.component.scss']
})
export class DoctorCreateProfileComponent implements OnInit{
  diagnosis: string = "";
  treatment: string = "";
  medications: string = "";
  scheduleId: number = 0;
  profileId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router
  ){}

  ngOnInit() {
    this.getScheduleId();
  }

  getScheduleId(){
    const scheduleIdParam = this.route.snapshot.paramMap.get('scheduleId');
    if (scheduleIdParam !== null) {
        const scheduleId = +scheduleIdParam;  // Chuyển thành số nếu không null
        this.scheduleId = scheduleId;
    } else {
        console.warn('Schedule ID không tồn tại trong route parameters');
    }
  }

  createProfile(){
    const profileDTO: ProfileDTO = {
      schedule_id: this.scheduleId,
      diagnosis: this.diagnosis,
      treatment: this.treatment,
      medications: this.medications,
      total_money: 0,
      total_insurance_money: 0
    }
    debugger
    this.profileService.createProfile( profileDTO).subscribe ({
      next: (response: any) =>{
        this.profileId = response.id;
        this.router.navigate(['/doctor/schedule-manage/create-profile/add-service/', this.profileId]);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
  }
}
