import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detail-service',
  templateUrl: './admin-detail-service.component.html',
  styleUrls: ['./admin-detail-service.component.scss']
})
export class AdminDetailServiceComponent implements OnInit{
  serviceId: number = 0;

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getServiceId();
  }

  getServiceId(){
    const serviceIdParam = this.route.snapshot.paramMap.get('service_id');
    if (serviceIdParam !== null) {
      const serviceId = +serviceIdParam;  // Chuyển thành số nếu không null
      this.serviceId = serviceId;
    } else {
      console.warn('Service ID không tồn tại trong route parameters');
    } 
  }

  
}
