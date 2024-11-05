import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PassWordDTO } from 'src/app/dtos/password.dto';
import { UserResponse } from 'src/app/responses/user.responses';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {
// @ViewChild('loginForm') loginForm!: NgForm;
password: string = "";
newPassword: string = "";
retypeNewPassword: string = "";
userResponse?: UserResponse;

constructor(
  private userService: UserService,
  private router: Router,
  private tokenService: TokenService
){
  this.password;
  this.newPassword;
  this.retypeNewPassword;
}
ngOnInit(): void {
  this.getUserDetail();
}

getUserDetail() {
  this.userResponse = this.userService.getUserResponseFromLocalStorage();
}
// Hiển thị mật khẩu khi click vào con mắt
togglePasswordVisibility(fieldId: string, event: any): void {
  const inputField = document.getElementById(fieldId) as HTMLInputElement;
  const icon = event.target;
  if (inputField.type === 'password') {
    inputField.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    inputField.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

updatePassword(){
  const id = this.userResponse?.id;
  const passwordDTO: PassWordDTO = {
    password: this.password,
    new_password: this.newPassword ,
    retype_new_password: this.retypeNewPassword
  }
  debugger
  this.userService.updatePassword(passwordDTO, id!).subscribe({
    next: (response: any) => {
      debugger;
      const birthday = new Date(response.birthday);
      const formattedBirthday = `${('0' + birthday.getDate()).slice(-2)}-${('0' + (birthday.getMonth() + 1)).slice(-2)}-${birthday.getFullYear()}`;

      this.userResponse = {
        ...response,
        birthday: formattedBirthday,  // Gán ngày sinh đã định dạng lại
      };
      this.userService.saveUserResponseToLocalStorage(this.userResponse);
      alert('Cập nhật mật khẩu thành công')
      this.tokenService.removeToken();
      this.router.navigate(['/login']);
    },
    complete: () => {
      debugger;

    },
    error: (error: any) => {
      debugger;
      alert('Cập nhật không thành công: ' + (error.error.message || 'Vui lòng thử lại!'));
    }
  })
}
}
