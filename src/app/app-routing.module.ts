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


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'list-doctors', component: ListDoctorComponent},
    {path: 'doctor-detail/:userId', component: DoctorDetailComponent},
    {path: 'update-password', component: UpdatePasswordComponent},

    {path: 'user/home', component: UserHomeComponent},
    {path: 'user/update', component: UserUpdateComponent},
    {path: 'user/create-schedule', component: UserCreateScheduleComponent},
    {path: 'user/get-schedule', component: UserGetScheduleComponent},

    {path: 'doctor/home', component: DoctorHomeComponent},
    {path: 'doctor/update', component: DoctorUpdateComponent},

    {path: 'admin/home', component: AdminHomeComponent},
    {path: 'admin/update', component: AdminUpdateComponent},
    {path: 'admin/doctor-manage', component: AdminDoctorManageComponent},
    {path: 'admin/doctor-manage/register' ,component: AdminDoctorRegisterComponent}
    

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}