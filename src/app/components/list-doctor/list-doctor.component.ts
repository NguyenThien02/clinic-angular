import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Specialty } from 'src/app/models/Specialty';
import { DoctorResponse } from 'src/app/responses/doctor.responses';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.scss']
})
export class ListDoctorComponent implements OnInit{
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] =[];
  listDoctors: DoctorResponse[] = [];

  page: number = 0;
  limit: number = 6;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private specialtyService: SpecialtyService,
    private doctorService: DoctorService
  ){}

  ngOnInit() {
    this.getAllSpecialties();
    this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
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

  getAllDoctors(page: number, limit: number, selectedSpecialtyId: number) {
    debugger
    this.doctorService.getAllDoctors(page, limit, selectedSpecialtyId).subscribe({
      next: (response: any) => {
        debugger
        response.listDoctors.forEach((doctorResponse: DoctorResponse) => {
          doctorResponse.image_url = `${environment.apiBaseUrl}/doctors/images/${doctorResponse.image_url}`;
        });
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
      this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
    }
  }

  searchServices(){
    debugger
    this.getAllDoctors(this.page, this.limit, this.selectedSpecialtyId);
  }
}
