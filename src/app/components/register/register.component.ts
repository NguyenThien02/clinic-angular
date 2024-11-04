import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDTO } from 'src/app/dtos/register.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  phoneNumber: string = "";
  password: string = "";
  retypePassword: string = "";
  fullName: string = "";
  birthday: Date = new Date();
  address: string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  togglePasswordVisibility(fieldId: string, event: any): void {
    const inputField = document.getElementById(fieldId) as HTMLInputElement;
    const icon = event.target.querySelector('i');
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

//kiểm tra xem password có trùng với retypePassword không 
checkPasswordsMatch() {
  if (this.password !== this.retypePassword) {
    this.registerForm.form.controls['retypePassword']
      .setErrors({ 'passwordMismatch': true });
  } else {
    this.registerForm.form.controls['retypePassword'].setErrors(null);
  }
}

//Kiểm tra đủ 18 tuổi chưa
checkAge() {
  if (this.birthday) {
    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      this.registerForm.form.controls['dateOfBirth'].setErrors({ 'invalidAge': true });
    } else {
      this.registerForm.form.controls['dateOfBirth'].setErrors(null);
    }
  }
}
// Hàm đăng nhập 
register(){
  const registerDTO: RegisterDTO = {
    "full_name": this.fullName,
    "phone_number": this.phoneNumber,
    "password": this.password,
    "retype_password": this.retypePassword,
    "birthday": this.birthday,
    "address": this.address,
    "role_id": 1
  }
  debugger
  this.userService.register(registerDTO).subscribe({
    next: (response: any) => {
      debugger
      this.router.navigate(['/login']);
    },
    complete: () => {
      debugger
    },
    error: (error: any) => {   
      alert(`Cannot register, error: ${error.error}`)      
    }
  })
}

}
