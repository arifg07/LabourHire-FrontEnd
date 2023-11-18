import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Block } from '@angular/compiler';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { LabourServicesService } from '../labour-services.service';
import { EmployerServiceService } from '../employer-service.service';
import { FormBuilder } from '@angular/forms';
import { Labour } from '../labour';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{

  static toggle:boolean;
  login:boolean = true;
  empemail:string ='';
  emppassword:string ='';
  labourPhone:string ='';
  labourPasword:string='';
  formLogin:any;

  constructor(private router: Router,
    private labourServices: LabourServicesService,
    private employerServices: EmployerServiceService,
    private fb:FormBuilder)
   {
     this.labourPhone = this.labourServices.getLabourNumber();
     this.labourPasword = this.labourServices.getLabourPassword();
     this.formLogin = this.fb.group({
      phone:[this.labourPhone,[]],
      labourPassword:[this.labourPasword,[]],
      email:[this.empemail,[]],
      employeePassword:[this.emppassword,[]],
     });
   }  
    
  public get toggle()
  {
    return LoginComponent.toggle;
  }
  public set toggle(value:boolean)
  {
     LoginComponent.toggle = value;
  }

  //Employer Login Validation
  employerLoginForm(email:HTMLInputElement,password:HTMLInputElement,invalidmsg:HTMLElement,reqmsg:HTMLElement)
  {
    if(password.value == '' || email.value == '')
    {
      invalidmsg.style.display = 'none';
      reqmsg.style.display = 'block';
      return;
    }
    this.employerServices.employerLogin(email.value,password.value);
  }

  //Labour Login Validation
  labourLoginForm(phone:HTMLInputElement,password:HTMLInputElement,msg:HTMLElement,reqmsg:HTMLElement)
  {
    if(password.value == '' || phone.value == '')
    {
      msg.style.display = 'none';
      reqmsg.style.display = 'block';
      return;
    }
    this.labourServices.labourLogin(phone.value,password.value);
  }

  validateNumber(newuser: any,phone:any,invalmsg:any)
  {
    if(0 < phone.value.length && phone.value.length < 10)
    {
      invalmsg.style.display='block';
    }
    this.labourServices.isLabourExists(phone.value).subscribe((data)=>{
      if(!data && phone.value.length == 10 )
      {
        newuser.style.display='block';
        phone.value ='';
      } 
    })
  }

  validateEmail(newemail: any,email:any,invalemail:any)
  {
    if(0 < email.value.length && !email.value.includes('@'))
    {
      invalemail.style.display='block';
    }
    this.employerServices.isEmployerExists(email.value).subscribe((data)=>{
      if(!data && email.value.includes('@'))
      {
        newemail.style.display='block';
        email.value ='';
      } 
    })
  }


  employerRegistraionForm()
  {
    LoginComponent.toggle = false;
    this.router.navigate(['/empreg']);
  }
  laboruRegistraionForm()
  {
    LoginComponent.toggle = true;
    this.router.navigate(['/labreg']);
  }


 
}


