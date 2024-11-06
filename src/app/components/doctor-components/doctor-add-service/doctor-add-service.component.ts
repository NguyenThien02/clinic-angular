import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { ProfileDetailDTO } from 'src/app/dtos/profileDetail.dto';
import { Service } from 'src/app/models/Service';
import { Specialty } from 'src/app/models/Specialty';
import { ProfileResponse } from 'src/app/responses/profile.response';
import { AddServiceService } from 'src/app/services/addService.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';
import { ServiceService } from 'src/app/services/service.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-doctor-add-service',
  templateUrl: './doctor-add-service.component.html',
  styleUrls: ['./doctor-add-service.component.scss']
})
export class DoctorAddServiceComponent implements OnInit{
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];
  services: Service[] = [];
  serviceId: number = 0;
  profileId: number = 0;
  page: number = 0;
  limit: number = 8;
  totalPages: number = 0;
  pages: number[] = [];
  
  selectServices: Service[] = [];
  selectServiceIds: number[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;
  profileResponse?: ProfileResponse;

  constructor(
    private route: ActivatedRoute,
    private specialtyService: SpecialtyService,
    private serviceService: ServiceService,
    private addServiceService: AddServiceService,
    private profileDetailService: ProfileDetailService,
    private router: Router,
    private profileService: ProfileService
){}

  ngOnInit() {
    this.getAllSpecialties();
    this.getProfileId();
    this.getServices(this.page, this.limit, this.selectedSpecialtyId);
    this.getSelectService()
  }

  getProfileId() {
    debugger
    const profileIdParam = this.route.snapshot.paramMap.get('profileId');
    if (profileIdParam !== null) {
      const profileId = +profileIdParam;  // Chuyển thành số nếu không null
      this.profileId = profileId;
    } else {
      console.warn('Profile ID không tồn tại trong route parameters');
    }
  }

  getAllSpecialties(){
    this.specialtyService.getAllSpecailties().subscribe({
      next: (response: any) => {
        this.specialties = response;
      },
      error: (error: any) => {
        alert('Không tìm thấy danh sách chuyên khoa ')
      }
    })
  }

  getServices(page: number, limit: number, selectedSpecialtyId: number){
    this.serviceService.getServices(this.page, this.limit, this.selectedSpecialtyId).subscribe({
      next: (response: any)=>{
        this.services = response.services;
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      error: (error: any) => {
        debugger;
        alert('Có lỗi khi lấy danh sách dịch vụ');
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
    this.getServices(this.page, this.limit, this.selectedSpecialtyId);
  }

// Thêm dịch vụ vào localstory
  addService(serviceId: number) {
    if (!this.addServiceService.isServiceInCart(this.profileId, serviceId)) {
      const confirmed = confirm('Bạn có chắc chắn muốn chọn dịch vụ này');
      if (confirmed) {
        this.addServiceService.addToCart(this.profileId, serviceId);
        this.getSelectService();
      }
    } else {
      alert('Dịch vụ này đã được chọn')
    }
  }

  deleteSelectService(selectServiceId: number){
    const confirmed = confirm('Bạn có chắc chắn muốn xóa dịch vụ này');
    if(confirmed){
      const addToProfileId = 'profileId:' + this.profileId.toString();
      const storedData = localStorage.getItem(addToProfileId);

      //phương thức JSON.parse(storedData) sẽ chuyển chuỗi JSON thành mảng các số (mảng serviceIds).
      let serviceIds: number[] = storedData ? JSON.parse(storedData) : [];
      // lọc mảng serviceIds để loại bỏ giá trị serviceId khỏi mảng
      serviceIds = serviceIds.filter(id => id !== selectServiceId);
      localStorage.setItem(addToProfileId, JSON.stringify(serviceIds));
      this.getSelectService();
    }
  }

  // lấy ra các dịch vụ đã chọn 
  getSelectService() {
    const addToProfileId = 'profileId:' + this.profileId.toString();
    const storedData = localStorage.getItem(addToProfileId);

    // Kiểm tra và chuyển đổi chuỗi JSON thành mảng number[]
    this.selectServiceIds = storedData ? JSON.parse(storedData) : [];

    this.serviceService.getServicesByIds(this.selectServiceIds).subscribe({
      next: (response: any) => {
        this.selectServices = response;
      },
      complete: () => {
        this.totalAmount = this.selectServices.reduce((sum, service) => sum + service.price, 0);
        this.totalAmountBHYT = this.selectServices.reduce((sum, service) => sum + service.insurancePrice, 0);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    })
  }
// Lưu các dịch vụ vào profile Detail 
  saveAddService(){
    debugger
    const profileDetailDTO: ProfileDetailDTO = {
      profile_id: this.profileId, 
      service_ids: this.selectServiceIds
    }
    this.profileDetailService.createProfileDetails(profileDetailDTO).subscribe({
      next: (response: any) =>{
        debugger
        this.profileResponse = response;
        this.updateMoney(response.id);
        if (this.profileResponse) {
          const addToProfileId = 'profileId:' + this.profileResponse.id.toString();
          localStorage.removeItem(addToProfileId);
          this.router.navigate(['/profile-manage/profile-detail/', this.profileResponse.id]);
        } else {
          alert('Không tìm thấy profileId này');
        }
      },
      error: (error: any) => {
        debugger;
        alert('Lỗi khi thêm dịch vụ vào hồ sơ');
      }
    })
  }

  updateMoney(profileId: number){
    const profileDTO: ProfileDTO = {
      schedule_id: 0,
      diagnosis: "",
      treatment: "",
      medications: "",
      total_money: this.totalAmount,
      total_insurance_money: this.totalAmountBHYT
    }
    debugger
    this.profileService.UpdateMoney(profileId, profileDTO).subscribe({
      next: (response: any) =>{
        debugger
      },
      error: (error: any) => {
        alert('Lỗi khi thêm tổng số tiền vào hồ sơ');
      }
    })
  }
}
