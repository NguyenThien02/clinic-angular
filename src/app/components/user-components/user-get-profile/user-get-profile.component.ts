import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileResponse } from 'src/app/responses/profile.response';
import { UserResponse } from 'src/app/responses/user.responses';
import { ProfileService } from 'src/app/services/profile.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-get-profile',
  templateUrl: './user-get-profile.component.html',
  styleUrls: ['./user-get-profile.component.scss']
})
export class UserGetProfileComponent implements OnInit {

  profiles: ProfileResponse[] = [];
  userResponse?: UserResponse;
  userId: number = 0;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit(): void {
    this.getUserResponse();
    this.getProfileByUserId();
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      alert("Không tìm thấy userResponse")
    }
  }

  getProfileByUserId() {
    this.profileService.getProfilesByUserId(this.userId).subscribe({
      next: (response: any) => {
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
        alert("Không lấy được danh sách profile");
      }
    })
  }

  deleteProfile(profileId: number, scheduleId: number) {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa hồ sơ này không');
    if (confirmed) {
      this.profileService.deleteProfileById(profileId).subscribe({
        next: (response: any) => {
          debugger
          alert(response.messenger);
        },
        error: (error: any) => {
          debugger;
          alert("Có lỗi khi xóa hồ sơ" + profileId);
        }
      })
      this.scheduleService.deleteScheduleById(scheduleId).subscribe({
        next: (response: any) => {
          debugger
          alert(response.messenger);
          window.location.reload(); 
        },
        error: (error: any) => {
          debugger;
          alert("Có lỗi khi xóa lịch khám");
        }
      })
    }
  }
}
