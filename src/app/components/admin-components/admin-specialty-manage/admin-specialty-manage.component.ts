import { Component, OnInit } from '@angular/core';
import { SpecailtyDTO } from 'src/app/dtos/specailty.dto';
import { Specialty } from 'src/app/models/Specialty';
import { SpecialtyDetailResponse } from 'src/app/responses/specialtyDetail.response';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-admin-specialty-manage',
  templateUrl: './admin-specialty-manage.component.html',
  styleUrls: ['./admin-specialty-manage.component.scss']
})
export class AdminSpecialtyManageComponent implements OnInit{
  specialties: Specialty[] = [];
  specialtyDetails: { [key: number]: SpecialtyDetailResponse } = {};
  name: string = "";
  isEditing: boolean = false; // Biến kiểm tra xem có đang chỉnh sửa không
  editSpecialty: Specialty = { id: 0, name: '' }; // Đối tượng chuyên khoa để chỉnh sửa
  

  constructor(
    private specialtyService: SpecialtyService
  ){}

  ngOnInit() {
    this.getAllSpecialties();
  }

  getAllSpecialties(){
    this.specialtyService.getAllSpecailties().subscribe({
      next: (response: any) =>{
        debugger
        this.specialties = response;
        this.loadSpecialtyDetail()
      },
      error: (error :Error) => {
        alert(" Không tìm thấy danh sách chuyên khoa");
      }
    })
  }

  loadSpecialtyDetail() {
    if(this.specialties){
      debugger
      this.specialties.forEach(specialty => {
        this.specialtyService.getSpecialtyDetail(specialty.id).subscribe({
          next: (response: any)=>{
            this.specialtyDetails[specialty.id] = response;
          },
          error: (error: Error) =>{
            alert("Có lỗi khi lấy tổng số bác sĩ và dịch vụ ")
          }
        });
      });
    }
  }

  createSpecialty(){
    const specailtyDTO: SpecailtyDTO = {
      name: this.name
    }
    this.specialtyService.createSpecialty(specailtyDTO).subscribe({
      next: (response: any) => {
        debugger
        alert("Tạo thành công chuyên khoa có tên: " + response.name)
        window.location.reload();
      },
      error: (error: Error) => {
        alert("Tạo chuyên khao không thành công!")
      }
    })
  }

  // Chức năng "Sửa" chuyên khoa
  editSpecialtyInfo(specialty: Specialty) {
    this.isEditing = true;
    this.editSpecialty = { ...specialty }; // Sao chép thông tin chuyên khoa vào đối tượng sửa
    // Cuộn trang xuống phần form chỉnh sửa
    const editFormElement = document.getElementById('edit-form');
    if (editFormElement) {
      editFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  saveSpecialty(specailtyId: number, specailtyName: string){
    const specailtyDTO: SpecailtyDTO = {
      name: specailtyName
    }
    debugger
    this.specialtyService.updateSpecialty(specailtyId,specailtyDTO).subscribe({
      next: (response: any) => {
        debugger
        alert("Cập nhật thành công chuyên khoa có tên: " + response.name)
        window.location.reload();
      },
      error: (error: Error) => {
        alert("Cập nhật chuyên khao không thành công!")
      }
    })
  }

  deleteSpecialty(specialtyId: number){
    if (window.confirm('Bạn có chắc muốn xóa chuyên khoa này không?')) {
      this.specialtyService.deleteSpecialty(specialtyId).subscribe({
        next: (response: any) => {
          alert(response.messenger);
          window.location.reload();
        },
        error: (error: Error) => {
          alert("Xóa chuyên khao không thành công!")
        }
      })
    }
  }

}
