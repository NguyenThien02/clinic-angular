import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { RegisterDTO } from "../dtos/register.dto";
import { Observable } from "rxjs";
import { LoginDTO } from "../dtos/login.dto";
import { UserResponse } from "../responses/user.responses";
import { UpdateUserDTO } from "../dtos/updateUser.dto";
import { PassWordDTO } from "../dtos/password.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiUsers = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO);
  }

  getUserDetail(token: string) {
    return this.http.get(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if (userResponse == null || !userResponse) {
        return;
      }
      //chuyển đổi đối tượng userResponse thành một chuỗi JSON
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }
  getUserResponseFromLocalStorage() {
    try {
      const userResponseJSON = localStorage.getItem('user');
      if (userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // chuyển đổi một chuỗi JSON (JSON string) thành một đối tượng JavaScript
      const userResponse = JSON.parse(userResponseJSON!);
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }
  updateUser(updateUserDTO: UpdateUserDTO, id: number): Observable<any> {
    debugger;
    return this.http.put(`${this.apiUsers}/${id}`, updateUserDTO);
  }
  updatePassword(passWordDTO: PassWordDTO, id: number): Observable<any> {
    debugger;
    return this.http.put(`${this.apiUsers}/${id}/password`, passWordDTO);
  }

  getUserResponesDoctor() {
    return this.http.get<any[]>(`${this.apiUsers}/user-doctor`);
  }

  getAllUsers(page: number, limit: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.apiUsers}/role-user`,{params})
  }

  getByUserId(userId: number){
    return this.http.get(`${this.apiUsers}/by-user-id/${userId}`)
  }

  deleteUserById(userId: number){
    return this.http.delete(`${this.apiUsers}/${userId}`);
  }
}  