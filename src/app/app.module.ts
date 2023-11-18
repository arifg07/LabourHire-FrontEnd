import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import{ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RegisterComponent } from './register/register.component';
import { LabourRegistrationComponent } from './register/labour-registration/labour-registration.component';
import { EmpRegistraionComponent } from './register/emp-registraion/emp-registraion.component';
import { HttpClientModule } from '@angular/common/http';
import { LabourDashBoardComponent } from './labour-dash-board/labour-dash-board.component';
import { EmployerDashboardComponent } from './employerdashboard/employerdashboard.component';
import { NgxStarsModule } from 'ngx-stars';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LabourRegistrationComponent,
    EmpRegistraionComponent,
    LabourDashBoardComponent,
    EmployerDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStarsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
