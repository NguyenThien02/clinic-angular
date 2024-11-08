import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckTimeSlotDTO } from 'src/app/dtos/checkTimeSlot.dto';
import { ScheduleDTO } from 'src/app/dtos/schedule.dto';
import { Specialty } from 'src/app/models/Specialty';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { UserResponse } from 'src/app/responses/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { TimeSlotService } from 'src/app/services/timeSlot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create-schedule',
  templateUrl: './user-create-schedule.component.html',
  styleUrls: ['./user-create-schedule.component.scss']
})
export class UserCreateScheduleComponent implements OnInit{

  userResponse?: UserResponse;
  userId: number = 0;
  userName: string = "";
  userPhone: string = "";
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];
  doctorId: number = 0;
  listDoctors: DoctorResponse[] = [];
  date: Date = new Date();
  timeSlotId: number = 0;
  timeSlots: TimeSlot[] = [];
  showFullScheduleMessage: boolean = false;

  constructor(
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private timeSlotService: TimeSlotService,
    private scheduleService: ScheduleService,
    private router: Router
  ){}


  ngOnInit() {
    this.getUserResponse();
    this.getSpecialties();
    this.getAllDoctors(0,100,this.selectedSpecialtyId);
    this.getTimeSlots();
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      console.error('No user response found');
    }
  }

  getSpecialties() {
    this.specialtyService.getAllSpecailties().subscribe({
      next: (response: any) => {
        this.specialties = response;
      },
      error: (error: any) => {
        debugger;
        alert("Không tìm thấy specialty");
      }
    });
  }

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    this.doctorService.getAllDoctors(page, limit, selectedSpecialtyId).subscribe({
      next: (response: any) => {
        this.listDoctors = response.listDoctors;
      },
      error: (error: any) => {
        debugger
        alert("Không tìm thấy danh sách doctor")
      }
    });
  }

  onSpecialtyChange() {
    debugger
    this.getAllDoctors(0, 100, this.selectedSpecialtyId);
  }

  getTimeSlots() {
    this.timeSlotService.getTimeSlots().subscribe({
      next: (response: any) => {
        debugger
        this.timeSlots = response;
      },
      error: (error: any) => {
        debugger
        alert("Không tìm thấy danh sách time slot")
      }
    })
  }

  checkTimeSlot(){
    debugger
    const checkTimeSlotDTO: CheckTimeSlotDTO = {
      "doctor_id": this.doctorId,
      "date": this.date
    }
    this.scheduleService.checkTimeSlot(checkTimeSlotDTO).subscribe ({
      next: (response: any) => {
        debugger
        if (response == null) {
          this.showFullScheduleMessage = true; // Hiển thị thông báo
        } else {
          this.timeSlots = response; // Gán danh sách thời gian khám
        }
      },
      error: (error: any) => {
        alert(`error: ${error.error}`)
      }
    })
  }
  saveSchedule() {
    debugger
    const scheduleDTO: ScheduleDTO = {
      "user_id": this.userId,
      "user_name": this.userName,
      "user_phone": this.userPhone,
      "doctor_id": this.doctorId,
      "date": this.date,
      "time_slot_id": this.timeSlotId
    }
    this.scheduleService.createSchedule(scheduleDTO).subscribe({
      next: (response: any) => {
        debugger
        alert('Tạo lịch khám thanh công');
        this.router.navigate(['/user/get-schedule']);
      },
      error: (error: any) => {
        alert('Tạo lịch khám không thanh công. Vui lòng thử lại sau!')
      }
    })
  }
}
