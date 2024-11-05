import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorDTO } from 'src/app/dtos/doctor.dto';
import { Specialty } from 'src/app/models/Specialty';
import { UserResponse } from 'src/app/responses/user.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-doctor-register',
  templateUrl: './admin-doctor-register.component.html',
  styleUrls: ['./admin-doctor-register.component.scss']
})
export class AdminDoctorRegisterComponent implements OnInit{

  userId: number = 0;
  listUserDoctors: UserResponse[] = [];
  specialties: Specialty[] = [];
  selectedSpecialtyId: number = 0;
  trainingProcess: string = "";
  jobDescription: string = "";

  constructor(
    private userService: UserService,
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService,
    private router: Router
  ){}

  ngOnInit() {
    this.userResponseDoctor();
    this.getSpecialties();
  }

  userResponseDoctor() {
    this.userService.getUserResponesDoctor().subscribe({
      next: (response: any) => {
        this.listUserDoctors = response;
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger;
        alert('Lỗi không tìm thấy userId có vai trò doctor: ' + (error.error.message || 'Vui lòng thử lại!'));
      }
    })
  }
  getSpecialties() {
    this.specialtyService.getAllSpecailties().subscribe({
      next: (response: any) => {
        this.specialties = response;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching service:', error);
      }
    });
  }

  registerDoctor(){
    const doctorDTO: DoctorDTO = {
      user_id: this.userId,
      specialty_id: this.selectedSpecialtyId,
      training_process: this.trainingProcess,
      job_description: this.jobDescription
    }
    debugger
    this.doctorService.registerDoctor(doctorDTO).subscribe({
      next: (response: any) => {
        debugger
        alert('Đăng ký thành công');
        this.router.navigate(['/admin/doctor-manage']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching service:', error);
      }
    })
  }
}
