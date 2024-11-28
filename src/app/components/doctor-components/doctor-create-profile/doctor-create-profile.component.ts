import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { Schedule } from 'src/app/models/Schedule';
import { ScheduleResponse } from 'src/app/responses/schedule.response';
import { ProfileService } from 'src/app/services/profile.service';
import { ScheduleService } from 'src/app/services/schedule.service';

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
  schedule?: ScheduleResponse;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private scheduleService: ScheduleService,
    private router: Router
  ){}

  ngOnInit() {
    this.getScheduleId();
    this.getSchedule();
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

  getSchedule(){
    this.scheduleService.getScheduleById(this.scheduleId).subscribe({
      next: (response: any) => {
        this.schedule = response;
      },
      error: (error: Error) => {
        alert(error);
      }
    })
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
