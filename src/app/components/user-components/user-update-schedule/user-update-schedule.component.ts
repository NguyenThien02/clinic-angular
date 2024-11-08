import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scheduled } from 'rxjs';
import { CheckTimeSlotDTO } from 'src/app/dtos/checkTimeSlot.dto';
import { ScheduleDTO } from 'src/app/dtos/schedule.dto';
import { Specialty } from 'src/app/models/Specialty';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { ScheduleResponse } from 'src/app/responses/schedule.response';
import { UserResponse } from 'src/app/responses/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { TimeSlotService } from 'src/app/services/timeSlot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-schedule',
  templateUrl: './user-update-schedule.component.html',
  styleUrls: ['./user-update-schedule.component.scss']
})
export class UserUpdateScheduleComponent {
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
  scheduleId: number = 0;
  schedule?: ScheduleResponse;


  constructor(
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private timeSlotService: TimeSlotService,
    private scheduleService: ScheduleService,
    private router: Router,
    private route: ActivatedRoute
  ){}


  ngOnInit() {
    this.getUserResponse();
    this.getSpecialties();
    this.getAllDoctors(0,100,this.selectedSpecialtyId);
    this.getTimeSlots();
    this.getScheduleId();
    this.getScheduleById();
  }
  getScheduleId() {
    debugger
    const scheduleIdParam = this.route.snapshot.paramMap.get('schedule_id');
    if (scheduleIdParam !== null) {
      const scheduleId = +scheduleIdParam;  // Chuyển thành số nếu không null
      this.scheduleId = scheduleId;
    } else {
      console.warn('Schedule ID không tồn tại trong route parameters');
    }
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
        alert("Không tìm thấy specialty");
      }
    });
  }

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    this.doctorService.getAllDoctors(page, limit, selectedSpecialtyId).subscribe({
      next: (response: any) => {
        this.listDoctors = response.listDoctors;
      },
      error: (error: any) => {
        alert("Không tìm thấy danh sách doctor")
      }
    });
  }

  onSpecialtyChange() {
    this.getAllDoctors(0, 100, this.selectedSpecialtyId);
  }

  getTimeSlots() {
    this.timeSlotService.getTimeSlots().subscribe({
      next: (response: any) => {
        this.timeSlots = response;
      },
      error: (error: any) => {
        alert("Không tìm thấy danh sách time slot")
      }
    })
  }

  checkTimeSlot(){
    const checkTimeSlotDTO: CheckTimeSlotDTO = {
      "doctor_id": this.doctorId,
      "date": this.date
    }
    this.scheduleService.checkTimeSlot(checkTimeSlotDTO).subscribe ({
      next: (response: any) => {
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

  getScheduleById(){
    this.scheduleService.getScheduleById(this.scheduleId).subscribe({
      next: (response: any) => {
        const date = new Date(response.date);
        const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
        this.schedule = {
          ...response,
          date: formattedDate
        };
      },
      error: (error: any) => {
        alert("Không tìm thấy lịch khám có id: " + this.scheduleId);
      }
    })
  }

  saveUpdateSchedule(){
    const scheduleDTO: ScheduleDTO = {
      user_id: this.userId,
      user_name: this.userName || this.schedule?.user_name || "",
      user_phone: this.userPhone || this.schedule?.user_phone || "",
      doctor_id: this.doctorId || this.schedule?.doctor_response.id || 0,
      date: this.date || this.schedule?.date || new Date(),
      time_slot_id: this.timeSlotId || this.schedule?.time_slot.id || 0
    }
    debugger
    this.scheduleService.updateScheduleById(this.scheduleId, scheduleDTO).subscribe({
      next: (response: any) => {
        debugger
        this.schedule = response;
        this.router.navigate(['/user/get-schedule'])
      },
      error: (error: any) => {
        alert("Chỉnh sửa lịch khám không thành công");
      }
    })
  }
}
