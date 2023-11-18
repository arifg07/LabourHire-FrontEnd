import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LabourRegistrationComponent } from './register/labour-registration/labour-registration.component';
import { EmpRegistraionComponent } from './register/emp-registraion/emp-registraion.component';
import { LabourDashBoardComponent } from './labour-dash-board/labour-dash-board.component';
import { EmployerDashboardComponent } from './employerdashboard/employerdashboard.component';



const routes: Routes = [{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:HomeComponent},
{path:'log',component:LoginComponent},
{path:'reg',component:RegisterComponent},
{path:'labreg',component:LabourRegistrationComponent},
{path:'empreg',component:EmpRegistraionComponent},
{path:'labourDashboard',component:LabourDashBoardComponent},
{path:'employerDashboard',component:EmployerDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  togg:boolean;
}
