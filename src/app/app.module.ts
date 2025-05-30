import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ListDoctorComponent } from './components/list-doctor/list-doctor.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

import { AdminHomeComponent } from './components/admin-components/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin-components/admin-header/admin-header.component';
import { AdminUpdateComponent } from './components/admin-components/admin-update/admin-update.component';
import { AdminDoctorManageComponent } from './components/admin-components/admin-doctor-manage/admin-doctor-manage.component';
import { AdminDoctorRegisterComponent } from './components/admin-components/admin-doctor-register/admin-doctor-register.component';

import { DoctorHeaderComponent } from './components/doctor-components/doctor-header/doctor-header.component';
import { DoctorHomeComponent } from './components/doctor-components/doctor-home/doctor-home.component';
import { DoctorUpdateComponent } from './components/doctor-components/doctor-update/doctor-update.component';
import { DoctorScheduleManageComponent } from './components/doctor-components/doctor-schedule-manage/doctor-schedule-manage.component';
import { DoctorUpdateProfileComponent } from './components/doctor-components/doctor-update-profile/doctor-update-profile.component';
import { DoctorCreateProfileComponent } from './components/doctor-components/doctor-create-profile/doctor-create-profile.component';
import { DoctorAddServiceComponent } from './components/doctor-components/doctor-add-service/doctor-add-service.component';

import { UserHeaderComponent } from './components/user-components/user-header/user-header.component';
import { UserHomeComponent } from './components/user-components/user-home/user-home.component';
import { UserUpdateComponent } from './components/user-components/user-update/user-update.component';
import { UserCreateScheduleComponent } from './components/user-components/user-create-schedule/user-create-schedule.component';
import { UserGetScheduleComponent } from './components/user-components/user-get-schedule/user-get-schedule.component';
import { DoctorProfileManageComponent } from './components/doctor-components/doctor-profile-manage/doctor-profile-manage.component';
import { UserGetProfileComponent } from './components/user-components/user-get-profile/user-get-profile.component';
import { UserUpdateScheduleComponent } from './components/user-components/user-update-schedule/user-update-schedule.component';
import { AdminUserManageComponent } from './components/admin-components/admin-user-manage/admin-user-manage.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AdminSpecialtyManageComponent } from './components/admin-components/admin-specialty-manage/admin-specialty-manage.component';
import { AdminServiceManageComponent } from './components/admin-components/admin-service-manage/admin-service-manage.component';
import { AdminCreateServiceComponent } from './components/admin-components/admin-create-service/admin-create-service.component';
import { AdminDetailServiceComponent } from './components/admin-components/admin-detail-service/admin-detail-service.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    HeaderComponent,
    ListDoctorComponent,
    ProfileDetailComponent,
    DoctorDetailComponent,
    UpdatePasswordComponent,

    AdminHomeComponent,
    AdminHeaderComponent,
    AdminUpdateComponent,
    AdminDoctorManageComponent,
    AdminDoctorRegisterComponent,
    AdminUserManageComponent,
    AdminSpecialtyManageComponent,
    AdminServiceManageComponent,
    AdminCreateServiceComponent,
    AdminDetailServiceComponent,

    DoctorHeaderComponent,
    DoctorHomeComponent,
    DoctorUpdateComponent,
    DoctorScheduleManageComponent,
    DoctorUpdateProfileComponent,
    DoctorCreateProfileComponent,
    DoctorAddServiceComponent,
    DoctorProfileManageComponent,

    UserHeaderComponent,
    UserHomeComponent,
    UserUpdateComponent,
    UserCreateScheduleComponent,
    UserGetScheduleComponent,
    UserGetProfileComponent,
    UserUpdateScheduleComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
