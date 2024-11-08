import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from 'src/app/responses/user.responses';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  userResponse?: UserResponse;
  userId: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ){}
  ngOnInit() {
    this.getUserId();
    this.getUserById();
  }

  getUserId(){
      const userIdParam = this.route.snapshot.paramMap.get('userId');
    if (userIdParam !== null) {
      const userId = +userIdParam;  // Chuyển thành số nếu không null
      this.userId = userId;
    } else {
      console.warn('user ID không tồn tại trong route parameters');
    }
  }

  getUserById(){
    this.userService.getByUserId(this.userId).subscribe({
      next:(response: any) => {
        debugger
        this.userResponse = response;
      },
      error: (error: any) => {
        alert("Không tìm thấy user có id: "+ this.userId);
      }
    })
  }

  goBack(): void {
    this.location.back();
  }
}
