import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/dtos/login.dto';
import { Role } from 'src/app/models/Role';
import { UserResponse } from 'src/app/responses/user.responses';
import { RoleService } from 'src/app/services/role.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  phoneNumber: string = "";
  password: string = "";
  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;
  userResponse?: UserResponse;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getRole();
  }
  getRole(){
    debugger
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => { // Sử dụng kiểu Role[]
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      error: (error: any) => {
        debugger
        console.error('Error getting roles:', error);
      }
    });
  }

  login() {
    debugger
    const loginDTO: LoginDTO = {
      phone_number: this.phoneNumber,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    // this.tokenService.removeToken();
    // localStorage.removeItem('user');
    this.userService.login(loginDTO).subscribe({
      next: (response: any) => {
        debugger;
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
        }
        this.userService.getUserDetail(token).subscribe({
          next: (response: any) => {
            debugger
            const birthday = new Date(response.birthday);
            const formattedBirthday = `${('0' + birthday.getDate()).slice(-2)}-${('0' + (birthday.getMonth() + 1)).slice(-2)}-${birthday.getFullYear()}`;
  
            this.userResponse = {
              ...response,
              birthday: formattedBirthday,  // Gán ngày sinh đã định dạng lại
            }; 
            this.userService.saveUserResponseToLocalStorage(this.userResponse);
            this.handleNavigation();
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            alert(error.error.message);
          }
        })
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    });
  }

  handleNavigation() {
    debugger
    if (this.userResponse?.role.id === 1) {
      this.router.navigate(['/user/home']);
    } else if (this.userResponse?.role.id === 2) {
      this.router.navigate(['/doctor/home']);
    } else if (this.userResponse?.role.id === 3) {
      this.router.navigate(['/admin/home']);
    }
  }

  togglePasswordVisibility(fieldId: string, event: any): void {
    const inputField = document.getElementById(fieldId) as HTMLInputElement;
    const icon = event.target;
    if (inputField.type === 'password') {
      inputField.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      inputField.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }
}

