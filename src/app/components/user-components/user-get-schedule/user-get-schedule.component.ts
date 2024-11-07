import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/models/Schedule';
import { ScheduleResponse } from 'src/app/responses/schedule.response';
import { UserResponse } from 'src/app/responses/user.responses';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-get-schedule',
  templateUrl: './user-get-schedule.component.html',
  styleUrls: ['./user-get-schedule.component.scss']
})
export class UserGetScheduleComponent implements OnInit {

  userResponse?: UserResponse;
  userId: number = 0;
  schedules: Schedule[] = [];
  page: number = 0;
  limit: number = 10;
  pages: number[] = [];
  totalPages: number = 0;

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit(): void {
    this.getUserResponse();
    this.getScheduleByUserId(this.userId, this.page, this.limit);
  }

  getUserResponse() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    if (this.userResponse) {
      this.userId = this.userResponse.id;
    } else {
      alert("Không tìm thấy userResponse")
    }
  }

  getScheduleByUserId(userId: number, page: number, limit: number) {
    debugger
    this.scheduleService.getScheduleByUserId(userId, page, limit).subscribe({
      next: (response: any) => {
        debugger
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

  deleteSchedule(scheduleId: number) {
    const confirmed = confirm('Bạn có chắc chắn muốn xóa lịch hẹn này không');
    if (confirmed) {
      this.scheduleService.deleteScheduleById(scheduleId).subscribe({
        next: (response: any) => {
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
  editSchedule(scheduleId: number) {
      
  }
}
