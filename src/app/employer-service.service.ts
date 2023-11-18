import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employer} from './employer';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class EmployerServiceService {

  private employer:Employer;
  private empid:any;
  public getEmployer()
  {
    return this.employer;
  }

  constructor(private http:HttpClient, private router:Router) { }

  private employervalidate = 'http://localhost:8090/api/employer/isalreadyexist/';

  private empLogin ='http://localhost:8090/api/employer/login';

  private validnumber = 'http://localhost:8090/api/employer/validatenumber/'

  private saveEmp = 'http://localhost:8090/api/employer';

  private updateEmp = 'http://localhost:8090/api/updateemployer';

  private getLabourList = 'http://localhost:8090/api/getlabourlist/?v_id=';

  private getLabourByVillage = 'http://localhost:8090/api/getlabourbyvillage/';

  private savereq = 'http://localhost:8090/api/saverequest';

  private isReqSent = 'http://localhost:8090/api/isreqalrdysent';

  private getHired = 'http://localhost:8090/api/gethiredlist';

  private requestList = 'http://localhost:8090/api/requestlist';
  
  isEmployerExists(email:string):any
  {
      return this.http.get(this.employervalidate+"?email="+email);
  }

  isaValidNumber(phone:string):any
  {
      return this.http.get(this.validnumber+"?phone="+phone);
  }

  employerLogin(email: String, password:string)
  {
     this.http.get(this.empLogin+"/?email="+email+"&password="+password).subscribe((data)=>
     {
      this.empid = data;
      this.employer = new Employer(data);
      window.sessionStorage.setItem('empobj',JSON.stringify(this.employer));
      window.sessionStorage.setItem('empid',this.empid.id)
      if(data != null)
      {
        this.router.navigate(['/employerDashboard']);
      }
      else
      {
        this.router.navigate(['/log']);
      }
     });
     
  }

  saveEmployer(employer:Employer):any
  {
     return this.http.post(this.saveEmp , employer).subscribe((data)=>
     {
      if(data)
      {
        alert("Registration Successful");
        this.router.navigate(['/log']);
      }
      else
      {
        this.router.navigate(['/log']);
      }
     })
  }

  updateEmployer(emp:any)
  {
    this.http.post(this.updateEmp,emp).subscribe((data) =>{
       console.log(data);
       window.sessionStorage.removeItem('empobj');
       window.sessionStorage.setItem('empobj',JSON.stringify(data));
    });
  }

  getLabourByVillageId(v_id:number): Observable<any>
  {
     return this.http.get(this.getLabourList+v_id);
  }

  getLabourByVillageAndSpec(village_id:any, spec_id:any):Observable<any>
  {
     return this.http.get(this.getLabourByVillage+"?villageId="+village_id+"&specId="+spec_id);
  }

  saveRequst(labour:number,employer:number)
  {
      const reqobj = {labourId:labour, employerId:employer};
      console.log(reqobj);
      this.http.post(this.savereq,reqobj).subscribe((data)=>
      {
        // console.log(data);
      });
  }

  isRequestAlreadySent(labour:number,employer:number):any
  {
     return this.http.get(this.isReqSent+"/?employerId="+employer+"&labourId="+labour);
  }

  getHiredList(emp_id:number):Observable<any>
  {
     return this.http.get(this.getHired+"/?emp_id="+emp_id);
  }

  getRequestList(emp_id:number):Observable<any>
  {
    return this.http.get(this.requestList+"/?emp_id="+emp_id);
  }
}
