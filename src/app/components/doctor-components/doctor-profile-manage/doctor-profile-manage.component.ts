import { Component, OnInit } from '@angular/core';
import { ProfileResponse } from 'src/app/responses/profile.response';
import { DoctorService } from 'src/app/services/doctor.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-doctor-profile-manage',
  templateUrl: './doctor-profile-manage.component.html',
  styleUrls: ['./doctor-profile-manage.component.scss']
})
export class DoctorProfileManageComponent implements OnInit{
  profiles: ProfileResponse[] = [];
  doctorId: number = 0;

  constructor(
    private doctorService: DoctorService,
    private profileService: ProfileService
  ){}

  ngOnInit() {
    this.getDoctorId();
    this.getProfilesByDoctorId();
  }

  getDoctorId(){
    const doctorResponse = this.doctorService.getDoctorResponseFromLocalStorage();
    if(doctorResponse){
      this.doctorId = doctorResponse.id;
    }else {
      alert("Không tìm thấy doctor Id")
    }
  }

  getProfilesByDoctorId() {
    this.profileService.getProfilesByDoctorId(this.doctorId).subscribe({
      next: (response: any) => {
        debugger;
        this.profiles = response.map((profile: ProfileResponse) => {
          // Định dạng ngày tháng từ profile.schedule.date
          const date = new Date(profile.schedule_response.date);
          const formattedDate = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;

          // Trả về đối tượng Profile với ngày đã được định dạng
          return {
            id: profile.id,
            schedule_response: {
              ...profile.schedule_response,
              date: formattedDate, // Thêm thuộc tính formattedDate nếu cần
              userName: profile.schedule_response.user_name,
              userPhone: profile.schedule_response.user_name,
              timeSlot: profile.schedule_response.time_slot.startEnd,
            },
            diagnosis: profile.diagnosis,
            treatment: profile.treatment,
            medications: profile.medications,
            total_money: profile.total_money,
            total_insurance_money: profile.total_insurance_money,
          };
        });
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }
}
