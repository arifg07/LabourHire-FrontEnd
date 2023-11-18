import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Labour } from './labour';
import { Router } from '@angular/router';
import { Employer } from './employer';
@Injectable({
  providedIn: 'root'
})
export class LabourServicesService {

  constructor(private http:HttpClient, private router:Router) { }

  labourNumber:string;
  labourPassword:string;

  getLabourNumber()
  {
    return this.labourNumber;
  }
  getLabourPassword()
  {
    return this.labourPassword;
  }

  private labourUrl = 'http://localhost:8090/api/labour';

  private labourvalidate = 'http://localhost:8090/api/validatephone';

  private getrequst ='http://localhost:8090/api/getrequests';


  saveLabour(labour: Labour):any
  {
      return this.http.post(this.labourUrl, labour).subscribe((data)=>{
        if(data)
        {
            this.labourNumber = labour.phone;
            this.labourPassword = labour.password;
            alert("Registration Successful");
            this.router.navigate(['/log']);
        }
        else
        {
          this.router.navigate(['/log']);
        }
      })
  }

  labourLogin(phone: String, password:string)
  {
     this.http.get(this.labourUrl+"/?phone="+phone+"&password="+password).subscribe((data)=>{
      console.log(data);
      if(data)
      {
        this.router.navigate(['/labourDashboard']);
      }
      window.sessionStorage.setItem("labour", JSON.stringify(data));
     });
     
  }

  isLabourExists(phone:string):any
  {
      return this.http.get(this.labourvalidate+"?phone="+phone);
  }

  getRequestList(labour_id:number):Observable<any>
  {
     return this.http.get(this.getrequst+"/?labour_id="+labour_id);
  }
}
