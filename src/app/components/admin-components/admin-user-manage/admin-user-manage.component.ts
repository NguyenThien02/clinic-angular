import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/responses/user.responses';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-manage',
  templateUrl: './admin-user-manage.component.html',
  styleUrls: ['./admin-user-manage.component.scss']
})
export class AdminUserManageComponent implements OnInit{
  userResponses: UserResponse[] = [];
  page: number = 0;
  limit: number = 8;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private userService: UserService
  ){}
  ngOnInit(){
    this.getAllUsers(this.page, this.limit);
  }

  getAllUsers(page: number, limit: number){
    this.userService.getAllUsers(page, limit).subscribe({
      next: (response: any)=>{
        debugger
        this.userResponses = response.userResponses;
        
        this.totalPages = response.totalPages;
        this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
      },
      error: (error: any) => {
        debugger;
        alert('Không tìm thấy danh sách user ');
      }
    })
  }
  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.getAllUsers(this.page, this.limit);
    }
  }

  deleteUseById(userId: number){
    const confirmed = confirm("Bạn có chắc muốn xóa user này!")
    if(confirmed){
      this.userService.deleteUserById(userId).subscribe({
        next:(response: any) => {
          alert(response.messenger);
          window.location.reload(); 
        },
        error: (error: Error) =>{
          alert("Xóa không thành công");
        } 
      })
    }
  }
}
