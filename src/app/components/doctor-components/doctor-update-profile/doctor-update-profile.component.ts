import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from 'src/app/dtos/profile.dto';
import { Service } from 'src/app/models/Service';
import { ProfileResponse } from 'src/app/responses/profile.response';
import { AddServiceService } from 'src/app/services/addService.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileDetailService } from 'src/app/services/profileDetail.service';

@Component({
  selector: 'app-doctor-update-profile',
  templateUrl: './doctor-update-profile.component.html',
  styleUrls: ['./doctor-update-profile.component.scss']
})
export class DoctorUpdateProfileComponent implements OnInit{

  profile?: ProfileResponse;
  profileId: number = 0;
  diagnosis: string = "";
  treatment: string = "";
  medications: string = "";
  services?: Service[] = [];
  totalAmount: number = 0;
  totalAmountBHYT: number = 0;


  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private profileDetailService:ProfileDetailService,
    private addServiceService: AddServiceService
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

  saveUpdateProfile(){
    const profileDTO: ProfileDTO = {
      schedule_id: this.profile?.schedule_response.id || 0,
      diagnosis: this.diagnosis || this.profile?.diagnosis || "",
      treatment: this.treatment || this.profile?.treatment || "",
      medications: this.medications || this.profile?.medications || "",
      total_money: this.profile?.total_money || 0,
      total_insurance_money: this.profile?.total_insurance_money || 0
    }
    debugger
    this.profileService.updateProfileById(this.profileId, profileDTO).subscribe({
      next: (response: any) => {
        debugger
          alert("Cập nhật hồ sơ bệnh án thành công");
          this.router.navigate(['/profile-manage/profile-detail/', this.profileId]);
      },
      error: (error: any) => {
        alert(error.error.message);
      }
    })
  }

  getSelectService() {
    this.profileDetailService.getServicesByProfileId(this.profileId).subscribe({
      next: (response: any) => {
        debugger
        this.services = response;
        if(this.services){
          response.map((service: Service)=>{
            this.addServiceService.addToCart(this.profileId, service.id);
          })
          this.totalAmount = this.services.reduce((sum, service) => sum + service.price, 0);
          this.totalAmountBHYT = this.services.reduce((sum, service) => sum + service.insurancePrice, 0);
        }
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }

}
