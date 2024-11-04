import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/responses/user.responses';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userResponse?: UserResponse;
  activeLink: string = 'home';

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) { }

  ngOnInit() { // Thêm phương thức ngOnInit
    this.userResponse = this.userService.getUserResponseFromLocalStorage(); // Khởi tạo userResponse
  }

  navigateHome() {
    if(this.checkToken()){
      if (this.userResponse?.role.id === 1) {
        this.router.navigate(['user/home']);
      }
      else if (this.userResponse?.role.id === 2) {
        this.router.navigate(['/doctor/home']);
      }
      else if (this.userResponse?.role.id === 3) {
        this.router.navigate(['/admin/home']);
      }
    }
  }

  checkToken(): boolean {
    const token = this.tokenService.getToken(); // Kiểm tra token
    if (!token) {
      alert('Bạn chưa đăng nhập!'); 
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
