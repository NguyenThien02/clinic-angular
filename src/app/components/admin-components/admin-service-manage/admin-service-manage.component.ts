import { Component, OnInit } from '@angular/core';
import { ServiceDTO } from 'src/app/dtos/service.dto';
import { Service } from 'src/app/models/Service';
import { Specialty } from 'src/app/models/Specialty';
import { ServiceService } from 'src/app/services/service.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-admin-service-manage',
  templateUrl: './admin-service-manage.component.html',
  styleUrls: ['./admin-service-manage.component.scss']
})
export class AdminServiceManageComponent implements OnInit{

  services: Service[] = [];
  specialties: Specialty[] = [];

  selectedSpecialtyId: number = 0;
  page: number = 0;
  limit: number = 8;
  totalPages: number = 0;
  pages: number[] = [];
  isEditing: boolean = false; 
  editService: Service = {
    id: 0,
    specialty: { id: 0, name: '' },
    name: '',
    price: 0,
    insurancePrice: 0
  };

  editServiceName: string = "";

  constructor(
    private serviceService: ServiceService,
    private specialtyService: SpecialtyService
  ){}

  ngOnInit() {
    this.getAllSpecialties();
    this.getAllServices(this.page, this.limit, this.selectedSpecialtyId);
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

  getAllServices(page: number, limit: number, selectedSpecialtyId: number){
    this.serviceService.getServices(this.page,this.limit,this.selectedSpecialtyId).subscribe({
      next: (response: any) => {
        debugger
        this.services = response.services;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      error: (error: Error) => {
        alert("Không tìm thấy danh sách dịch vụ")
      }
    })
  }

  searchServices(){
    this.getAllServices(this.page, this.limit, this.selectedSpecialtyId);
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllServices(this.page, this.limit, this.selectedSpecialtyId);
    }
  }

  deleteServiceById(specialtyId: number){
    if (window.confirm('Bạn có chắc muốn xóa dịch vụ có Id: ' + specialtyId + ' này không?')) {
      this.serviceService.deleteServiceById(specialtyId).subscribe({
        next: (response: any) => {
          debugger
          alert(response.messenger);
          window.location.reload();
        },
        error: (error: Error) => {
          alert("Xóa không thành công dịch vụ có Id: " + specialtyId)
        }
      })
    }
  }

  editSpecialtyInfo(service: Service){
    this.isEditing = true;
    this.editService = { ... service};
    // Cuộn trang xuống phần form chỉnh sửa
    const editFormElement = document.getElementById('edit-form');
    if (editFormElement) {
      editFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  saveService(id: number, specailtyId: number, name: string, price: number, insurancePrice: number){
    const serviceDTO: ServiceDTO = {
      name: name,
      specialty_id: specailtyId,
      price: price,
      insurance_price: insurancePrice
    }
    debugger
    this.serviceService.updateService(id, serviceDTO).subscribe({
      next: (response: any) => {
        debugger
        alert("Cập nhật thành công");
        window.location.reload();
      },
      error: (error: Error) => {
        alert("Cập nhật không thành công dịch vụ có Id: " + id)
      }
    })
  }
}
