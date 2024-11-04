import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { ListDoctorComponent } from "./components/list-doctor/list-doctor.component";
import { DoctorDetailComponent } from "./components/doctor-detail/doctor-detail.component";
import { AdminHomeComponent } from "./components/admin-components/admin-home/admin-home.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'list-doctors', component: ListDoctorComponent},
    {path: 'doctor-detail/:doctorId', component: DoctorDetailComponent},
    {path: 'admin/home', component: AdminHomeComponent}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}