import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,Validators} from '@angular/forms';
import { Employer } from 'src/app/employer';
import { PasswordValidator} from 'src/app/form.validator';
import { UtilitiesService } from 'src/app/utilities.service';
import { EmployerServiceService } from 'src/app/employer-service.service';

@Component({
  selector: 'app-emp-registraion',
  templateUrl: './emp-registraion.component.html',
  styleUrls: ['./emp-registraion.component.css']
})
export class EmpRegistraionComponent {

  eyeToggle:boolean;
  inputval:string='password';
  regToggle:boolean;
  matchpass:boolean = true;
  retypass:string='';
  inputType:string;
  maxDate:number;
  minDate:number;
  stateList:any;
  districtList:any;
  villageList:any;
  district:boolean = true;
  validPhone:boolean = true;
  passMissMatch:boolean = false;
  passlen:boolean = false;
  employer:Employer;

  constructor(private fb:FormBuilder,private utlityMethod:UtilitiesService,private empServices:EmployerServiceService)
  {
     this.maxDate = new Date().getFullYear() - 18;
     this.minDate = new Date().getFullYear() - 60;
     this.inputType = 'text';
     this.regToggle = true;

  }
  
  registrationForm = this.fb.group({
      fname: ['',[Validators.required]],
      lname: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]], 
      password: ['',[Validators.required]],
      confirmPassword: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      dateofbirth: ['',[Validators.required]],
      state_id: ['',[Validators.required]],
      district_id: ['',[Validators.required]],
      village_id: ['',[Validators.required]],
      place: ['',[Validators.required]],
      postcode: ['',[Validators.required]]

    },{validator: PasswordValidator});
  submitted:boolean=false;

  
  ngDoCheck()
  {
    
  }

  ngOnInit()
  {
    this.registrationForm.get("district_id").disable();
    this.registrationForm.get("village_id").disable();

    this.utlityMethod.getStates().subscribe((data)=>{
        console.log(data);
        this.stateList = data;
    });
  }

  //District List
  getDistrictList(stateid: any)
  {
    this.registrationForm.get("district_id").enable();
    this.utlityMethod.getDistrict(stateid).subscribe((data)=>{
      this.districtList = data;
    });
  }

  //Village List
  getVillageList(districtid: any)
  {
    this.registrationForm.get("village_id").enable();
    this.utlityMethod.getVillage(districtid).subscribe((data)=>{
      this.villageList = data;
    });
  }

  //validate phone number
  validatePhone(phone:any,errormsg:any)
  {
    let phoneNumber = this.registrationForm.value.phone;
    console.log(phoneNumber);
    this.empServices.isaValidNumber(phoneNumber).subscribe((data)=>{
        console.log(data);
        if(data && phoneNumber.length == 10) {
          errormsg.style.display = 'block';
          phone.value='' ;
        }
         else{
          errormsg.style.display = 'none';
         }
          
         
    });
  }

  validateEmail(email:any,emailerrormsg:any)
  {
    let emailid = this.registrationForm.value.email;
    this.empServices.isEmployerExists(emailid).subscribe((data)=>{
      if(data && emailid.includes('@'))
      {
        emailerrormsg.style.display = 'block';
        email.value ='';
      }
      else
      {
        emailerrormsg.style.display = 'none';
      }
    });

  }

  //On Submitting form 
  onSubmit(employerForm: any)
  {
    this.employer = new Employer(employerForm);
    console.log(this.employer);
    this.empServices.saveEmployer(this.employer);
  }
  // checkPass(ele:any)
  // {
  //   console.log(this.emp.password);
  //   if(this.emp.password != '' && this.retypass != '')
  //   {
  //    if(this.emp.password != this.retypass)
  //    {
  //      this.matchpass = false;
  //      ele.innerHTML="Password mismatch!!";
  //    }
  //    else{
  //     ele.innerHTML="Password matched";
  //     this.matchpass = true;
  //    }
  //   }
  // }
  validNumber:boolean=false;
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }

}
