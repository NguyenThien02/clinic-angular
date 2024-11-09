import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { ListDoctorComponent } from "./components/list-doctor/list-doctor.component";
import { DoctorDetailComponent } from "./components/doctor-detail/doctor-detail.component";
import { AdminHomeComponent } from "./components/admin-components/admin-home/admin-home.component";
import { AdminUpdateComponent } from "./components/admin-components/admin-update/admin-update.component";
import { UpdatePasswordComponent } from "./components/update-password/update-password.component";
import { UserHomeComponent } from "./components/user-components/user-home/user-home.component";
import { UserUpdateComponent } from "./components/user-components/user-update/user-update.component";
import { DoctorHomeComponent } from "./components/doctor-components/doctor-home/doctor-home.component";
import { DoctorUpdateComponent } from "./components/doctor-components/doctor-update/doctor-update.component";
import { AdminDoctorManageComponent } from "./components/admin-components/admin-doctor-manage/admin-doctor-manage.component";
import { AdminDoctorRegisterComponent } from "./components/admin-components/admin-doctor-register/admin-doctor-register.component";
import { UserCreateScheduleComponent } from "./components/user-components/user-create-schedule/user-create-schedule.component";
import { UserGetScheduleComponent } from "./components/user-components/user-get-schedule/user-get-schedule.component";
import { DoctorScheduleManageComponent } from "./components/doctor-components/doctor-schedule-manage/doctor-schedule-manage.component";
import { DoctorCreateProfileComponent } from "./components/doctor-components/doctor-create-profile/doctor-create-profile.component";
import { DoctorAddServiceComponent } from "./components/doctor-components/doctor-add-service/doctor-add-service.component";
import { DoctorProfileManageComponent } from "./components/doctor-components/doctor-profile-manage/doctor-profile-manage.component";
import { ProfileDetailComponent } from "./components/profile-detail/profile-detail.component";
import { DoctorUpdateProfileComponent } from "./components/doctor-components/doctor-update-profile/doctor-update-profile.component";
import { UserGetProfileComponent } from "./components/user-components/user-get-profile/user-get-profile.component";
import { UserUpdateScheduleComponent } from "./components/user-components/user-update-schedule/user-update-schedule.component";
import { AdminUserManageComponent } from "./components/admin-components/admin-user-manage/admin-user-manage.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { AdminSpecialtyManageComponent } from "./components/admin-components/admin-specialty-manage/admin-specialty-manage.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'list-doctors', component: ListDoctorComponent},
    {path: 'doctor-detail/:userId', component: DoctorDetailComponent},
    {path: 'update-password', component: UpdatePasswordComponent},
    {path: 'profile-manage/profile-detail/:profileId', component: ProfileDetailComponent},
    {path: 'user-detail/:userId', component: UserDetailComponent},
    

    {path: 'user/home', component: UserHomeComponent},
    {path: 'user/update-user', component: UserUpdateComponent},
    {path: 'user/create-schedule', component: UserCreateScheduleComponent},
    {path: 'user/get-schedule', component: UserGetScheduleComponent},
    {path: 'user/get-schedule/update-schedule/:schedule_id', component: UserUpdateScheduleComponent },
    {path: 'user/get-profile', component: UserGetProfileComponent},
    

    {path: 'doctor/home', component: DoctorHomeComponent},
    {path: 'doctor/update-doctor', component: DoctorUpdateComponent},
    {path: 'doctor/schedule-manage', component: DoctorScheduleManageComponent},
    {path: 'doctor/schedule-manage/create-profile/:scheduleId', component: DoctorCreateProfileComponent},
    {path: 'doctor/schedule-manage/create-profile/add-service/:profileId', component: DoctorAddServiceComponent},
    {path: 'doctor/profile-manage/add-service/:profileId', component: DoctorAddServiceComponent},
    {path: 'doctor/profile-manage', component: DoctorProfileManageComponent},
    {path: 'doctor/profile-manage/update-profile/:profileId', component: DoctorUpdateProfileComponent },

    
    {path: 'admin/home', component: AdminHomeComponent},
    {path: 'admin/update', component: AdminUpdateComponent},
    {path: 'admin/doctor-manage', component: AdminDoctorManageComponent},
    {path: 'admin/doctor-manage/register' ,component: AdminDoctorRegisterComponent},
    {path: 'admin/user-manage', component: AdminUserManageComponent},
    {path: 'admin/specialty-manage', component: AdminSpecialtyManageComponent}
    

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}