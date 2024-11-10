import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDTO } from 'src/app/dtos/service.dto';
import { Specialty } from 'src/app/models/Specialty';
import { ServiceService } from 'src/app/services/service.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-admin-create-service',
  templateUrl: './admin-create-service.component.html',
  styleUrls: ['./admin-create-service.component.scss']
})
export class AdminCreateServiceComponent implements OnInit{
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];
  name: string = "";
  price: number = 0;
  insurancePrice: number = 0;

  constructor(
    private specialtyService: SpecialtyService,
    private serviceService: ServiceService,
    private router: Router
  ){}

  ngOnInit() {
    this.getSpecialties();
  }

  getSpecialties() {
    this.specialtyService.getAllSpecailties().subscribe({
      next: (response: any) => {
        this.specialties = response;
      },
      error: (error: any) => {
        debugger;
        alert("Không tìm thấy danh sách chuyên khoa");
      }
    });
  }
  saveService(){
    const serviceDTO: ServiceDTO = {
      specialty_id: this.selectedSpecialtyId,
      name : this.name,
      price: this.price,
      insurance_price: this.insurancePrice
    }
    debugger
    this.serviceService.createService(serviceDTO).subscribe({
      next: (response: any) => {
        debugger
        alert("Tạo thành công dịch vụ mới có tên: "+ response.name);
        this.router.navigate(["/admin/service-manage"])
      },
      error: (error: Error) => {
        alert("Tạo dịch vụ mới không thành công");
      }
    })
  }
}
