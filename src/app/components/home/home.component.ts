import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { Specialty } from 'src/app/models/Specialty';
import { ServiceService } from 'src/app/services/service.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];
  services: Service[] = [];

  page: number = 0;
  limit: number = 12;
  totalPages: number = 0;
  pages: number[] = [];

  images: string[] = [
    'https://baosonhospital.com/Upload/banner/banner-web-t7_2024.webp',
    'https://baosonhospital.com/Upload/banner/tien-hon-nhan_result.webp',
    'https://baosonhospital.com/Upload/banner/banner-bvbs-1.webp',
    'https://baosonhospital.com/Upload/banner/thoai-hoa-khop_result.webp',
    'https://baosonhospital.com/Upload/banner/cat-thang-luoi_result.webp',
  ];
  currentImageIndex: number = 0;


  constructor(
    private specialtyService: SpecialtyService,
    private serviceService: ServiceService
  ){}

  ngOnInit(){
    this.getAllSpecialties();
    this.getServices(this.page, this.limit, this.selectedSpecialtyId);
    setInterval(() => {
      this.changeImage();
    }, 4000); // Chuyển ảnh mỗi 4 giây
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

  getServices(page: number, limit: number, selectedSpecialtyId: number){
    this.serviceService.getServices(this.page, this.limit, this.selectedSpecialtyId).subscribe({
      next: (response: any)=>{
        debugger
        this.services = response.services;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching service:', `error: ${error.error}`);
      }
    })
  }
  
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getServices(this.page, this.limit, this.selectedSpecialtyId);
    }
  }

  searchServices(){
    debugger
    this.getServices(this.page, this.limit, this.selectedSpecialtyId);
  }

  changeImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}
