import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Labour } from '../../labour';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder,Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/form.validator';
import { Employer } from 'src/app/employer';
import{LabourServicesService} from 'src/app/labour-services.service'
import { UtilitiesService } from 'src/app/utilities.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-labour-registration',
  templateUrl: './labour-registration.component.html',
  styleUrls: ['./labour-registration.component.css']
})
export class LabourRegistrationComponent 
{
  inputval:string='password';
  eyeToggle:boolean;

  inputType:string;
  maxDate:number;
  minDate:number;
  stateList:any;
  districtList:any;
  villageList:any;
  specializationList:any;
  specList:any;
  dropdownSettings:IDropdownSettings = {};
  labour:Labour;
  district:boolean = true;
  validPhone:boolean = true;
  passMissMatch:boolean = false;
  passlen:boolean = false;
  
  constructor(private fb:FormBuilder, private labourService:LabourServicesService,
    private utlityMethod:UtilitiesService)
  {
     this.maxDate = new Date().getFullYear() - 18;
     this.minDate = new Date().getFullYear() - 60;
     this.inputType = 'text';
     this.eyeToggle = true;

  }
  registrationForm = this.fb.group({
      fname: ['',[Validators.required]],
      lname: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.pattern('[0-9]{10}')]], 
      password: ['',[Validators.required,Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required]],
      gender: ['',[Validators.required]],
      dob: ['',[Validators.required]],
      stateId: ['',[Validators.required]],
      districtId: ['',[Validators.required]],
      villageId: ['',[Validators.required]],
      place: ['',[Validators.required]],
      postcode: ['',[Validators.required]],
      specializationId : ['',[Validators.required]],
      hourlycharges:['',[Validators.required]] },{validator: PasswordValidator}
    );

  ngDoCheck()
  {

  }
  onSubmit(labourForm: any)
  {
    labourForm.specializationId = labourForm.specializationId[0].id;
    console.log(labourForm.specializationId);
    this.labour = new Labour(labourForm);
    this.labourService.saveLabour(this.labour);
  }
  validNumber:boolean=false;
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }
  ngOnChanges()
  {

  }
  getDistrictList(stateid: any)
  {
    console.log(stateid);
    this.registrationForm.get("districtId").enable();
    this.utlityMethod.getDistrict(stateid).subscribe((data)=>{
      this.districtList = data;
    });
  }

  getVillageList(districtid: any)
  {
    this.registrationForm.get("villageId").enable();
    this.utlityMethod.getVillage(districtid).subscribe((data)=>{
      this.villageList = data;
    });
  }

  validatePhone(phoneinput:HTMLInputElement)
  {
    let phoneNumber = this.registrationForm.value.phone;
    console.log(phoneNumber);
    this.labourService.isLabourExists(phoneNumber).subscribe((data)=>{
        console.log(data);
        if(data && phoneNumber.length == 10) {
         document.getElementById("existmsg").style.display = 'block';
          phoneinput.value='' ;
        }
         else{
          document.getElementById("existmsg").style.display = 'none';
         }
          
         
    });
  }
  
  ngOnInit() {

    this.registrationForm.get("districtId").disable();
    this.registrationForm.get("villageId").disable();
    this.utlityMethod.getSpecialization().subscribe((data)=>{
      this.specList = data;
     });

    this.utlityMethod.getStates().subscribe((data)=>{
        this.stateList = data;
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'specialization',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
}
