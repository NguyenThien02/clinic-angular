import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/models/Service';
import { Statistics } from 'src/app/responses/statistics.response';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-admin-detail-service',
  templateUrl: './admin-detail-service.component.html',
  styleUrls: ['./admin-detail-service.component.scss']
})
export class AdminDetailServiceComponent implements OnInit{
  serviceId: number = 0;
  month: number = new Date().getMonth() + 1;
  totalPrice: number[] = Array(30).fill(0);
  totalInsurancePrice: number[] = Array(30).fill(0);
  service?: Service;
  statistics: Statistics[] = [];
  months: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ){}

  ngOnInit(): void {
    this.getServiceId();
    this.getServiceDetail(this.month)
  }

  getServiceId(){
    const serviceIdParam = this.route.snapshot.paramMap.get('serviceId');
    if (serviceIdParam !== null) {
      const serviceId = +serviceIdParam;  // Chuyển thành số nếu không null
      this.serviceId = serviceId;
    } else {
      console.warn('Service ID không tồn tại trong route parameters');
    } 
  }

  getServiceDetail(month: number){
    this.serviceService.getServiceDetail(this.serviceId, this.month).subscribe({
      next:(response: any) => {
        debugger
        this.service = response.service;
        this.statistics = response.statistics;
        this.statistics.forEach((statistic: Statistics) => {
          this.totalPrice[statistic.date] =  response.service.price * statistic.totalServicesUsed;
          this.totalInsurancePrice[statistic.date] = response.service.insurancePrice * statistic.totalServicesUsed;
        });
      },
      error:(error: Error) => {
        alert(error);
      }
    })
  }

  searchMonth(){
    this.getServiceDetail(this.month)
  }
}
