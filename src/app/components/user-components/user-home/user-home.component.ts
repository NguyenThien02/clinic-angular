import { Component } from '@angular/core';
import { UserResponse } from 'src/app/responses/user.responses';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent {
  userResponse?: UserResponse;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }
}
