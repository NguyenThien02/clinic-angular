import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/models/Schedule';
import { ScheduleResponse } from 'src/app/responses/schedule.response';
import { DoctorService } from 'src/app/services/doctor.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-doctor-schedule-manage',
  templateUrl: './doctor-schedule-manage.component.html',
  styleUrls: ['./doctor-schedule-manage.component.scss']
})
export class DoctorScheduleManageComponent implements OnInit{
  schedules: Schedule[] = [];
  doctorId: number = 0;
  page: number = 0;
  limit: number = 8;
  pages: number[] = [];
  totalPages: number = 0;
  
  constructor(
    private scheduleService: ScheduleService,
    private doctorService: DoctorService,
    private router: Router
  ){}

  ngOnInit() {
    this.getDoctorResponse();
    this.getScheduleByDoctorId(this.doctorId, this.page, this.limit);
  }
  getDoctorResponse(){
    const doctorResponse = this.doctorService.getDoctorResponseFromLocalStorage();
    if(doctorResponse){
      this.doctorId = doctorResponse.id;
    }else {
      alert("Không tìm thấy doctor Id")
    }
  }

  getScheduleByDoctorId(doctorId: number, page: number, limit: number){
    this.scheduleService.getScheduleByDoctorId(this.doctorId, this.page, this.limit).subscribe({
      next: (response: any) =>{
        this.schedules = response.scheduleResponses.map((schedule: ScheduleResponse) => {
          const date = new Date(schedule.date);
          const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
          return {
            ...schedule,
            date: formattedDate  // Add formatted birthday
          };
        });
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);

      }
    })
  }
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      debugger
      this.page = page;
      this.getScheduleByDoctorId(this.doctorId, page, this.limit)
    }
  }

  createProfile(scheduleId: number){
    debugger
    this.router.navigate(['/doctor/schedule-manage/create-profile/', scheduleId]);
  }
}
