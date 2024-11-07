import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/models/Service';
import { ProfileResponse } from 'src/app/responses/profile.response';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit{

  profile?: ProfileResponse;
  profileId: number = 0;
  services: Service[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;
  

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private profileDetailService: ProfileDetailService,
    private location: Location
  ){}

  ngOnInit() {
    this.getProfileId();
    this.getProfileById();
    this.getSelectService();
  }
  getProfileId() {
    const profileIdParam = this.route.snapshot.paramMap.get('profileId');
    if (profileIdParam !== null) {
      const profileId = +profileIdParam;  // Chuyển thành số nếu không null
      this.profileId = profileId;
    } else {
      console.warn('Profile ID không tồn tại trong route parameters');
    }
  }

  getProfileById() {
    this.profileService.getProfileById(this.profileId).subscribe({
      next: (response: any) => {
        const newDate = new Date(response.schedule_response.date);
        const formattedDate = `${('0' + newDate.getDate()).slice(-2)}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${newDate.getFullYear()}`;
        this.profile = {
          ...response,
          schedule_response: {
            ...response.schedule_response,
            date: formattedDate,
          }
        }
      },
      error: (error: any) => {
        alert("Không tìm thấy profile có id: "+ this.profileId);
      }
    });
  }

  getSelectService() {
    this.profileDetailService.getServicesByProfileId(this.profileId).subscribe({
      next: (response: any) => {
        debugger
        this.services = response;
      },
      complete: () => {
        debugger;
        this.totalAmount = this.services.reduce((sum, service) => sum + service.price, 0);
        this.totalAmountBHYT = this.services.reduce((sum, service) => sum + service.insurancePrice, 0);
      },
      error: (error: any) => {
        debugger;
        alert("Không tìm thấy danh sách dịch vụ đã chọn ");
      }
    })
  }
  goBack(): void {
    this.location.back(); // Quay về trang trước đó
  }
}
