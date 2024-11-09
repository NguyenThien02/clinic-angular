import { Component, OnInit } from '@angular/core';
import { Specialty } from 'src/app/models/Specialty';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { UserResponse } from 'src/app/responses/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-doctor-manage',
  templateUrl: './admin-doctor-manage.component.html',
  styleUrls: ['./admin-doctor-manage.component.scss']
})
export class AdminDoctorManageComponent implements OnInit {
  userResponse?: UserResponse;
  listDoctors: DoctorResponse[] = [];
  specialties: Specialty[] = [];
  selectedSpecialtyId: number = 0;

  page: number = 0;
  limit: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
    this.getAllSpecialties();
  }

  getAllSpecialties(){
    this.specialtyService.getAllSpecailties().subscribe({
      next: (response: any) => {
        this.specialties = response;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    })
  }
  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number){
    this.doctorService.getAllDoctors(page, limit, selectedSpecialtyId).subscribe({
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
      this.getAllDoctors(this.page, this.limit,  this.selectedSpecialtyId);
    }
  }

  searchDoctors(){
    this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
  }

  confirmDeleteDoctor(userId: number ,doctorId: number) {
    if (window.confirm('Bạn có chắc muốn xóa bác sĩ này không?')) {
      this.deleteUser(userId);   
      this.deleteDoctor(doctorId); 
    }
  }

  deleteDoctor(doctorId: number){
    this.doctorService.deleteDoctorById(doctorId).subscribe({
      next: (response: any) => {
        debugger
        alert("Xóa thành công doctor có id "+ doctorId);
        window.location.reload(); 
      },
      error: (error: any) => {
        alert("Có lỗi khi xóa doctor có id "+ doctorId);
      }
    });
  }

  deleteUser(userId: number){
    this.userService.deleteUserById(userId).subscribe({
      next:(response: any) => {
        alert("Xóa thành công user có id: " + userId);
      },
      error: (error: Error) =>{
        alert("Xóa không thành công user có id: " + userId);
      } 
    })
  }
}
