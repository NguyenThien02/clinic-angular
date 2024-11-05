import { Component, OnInit } from '@angular/core';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { UserResponse } from 'src/app/responses/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-doctor-manage',
  templateUrl: './admin-doctor-manage.component.html',
  styleUrls: ['./admin-doctor-manage.component.scss']
})
export class AdminDoctorManageComponent implements OnInit {
  userResponse?: UserResponse;

  listDoctors: DoctorResponse[] = [];
  page: number = 0;
  limit: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private userService: UserService,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getAllDoctors(this.page, this.limit);
  }

  getAllDoctors(page: number, limit: number){
    this.doctorService.getAllDoctors(page, limit,0).subscribe({
        next: (response: any) =>{
          debugger
          this.listDoctors = response.listDoctors;
         this.totalPages = response.totalPages;
         this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {
          debugger
          console.error('Error fetching service:', error);
        }
    });
  }
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllDoctors(this.page, this.limit);
    }
  }
  confirmDeleteDoctor(id: number) {
    if (window.confirm('Bạn có chắc muốn xóa bác sĩ này không?')) {
      this.deleteDoctorById(id);
    }
  }
  deleteDoctorById(id: number){
    this.doctorService.deleteDoctorById(id).subscribe({
      next: (response: any) => {
        debugger
        console.log('Doctor deleted successfully', response);
        // Cập nhật danh sách doctor sau khi xóa thành công
        this.getAllDoctors(this.page, this.limit);
      },
      error: (error: any) => {
        console.error('Error deleting doctor:', error);
      }
    });
  }
}
