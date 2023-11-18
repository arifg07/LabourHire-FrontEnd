import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployerServiceService } from '../employer-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UtilitiesService } from '../utilities.service';
import { Router } from '@angular/router';
import{noEmptyValue} from 'src/app/form.validator';
import { Labour } from '../labour';
import { NgxStarsModule } from 'ngx-stars';

@Component({
  selector: 'app-employerdashboard',
  templateUrl: './employerdashboard.component.html',
  styleUrls: ['./employerdashboard.component.css']
})
export class EmployerDashboardComponent {

  @ViewChild('hiresection')
  hirePage:any;

  @ViewChild('hiredsection')
  hiredPage:any;

  @ViewChild('profilesection')
  profilePage:any;

  @ViewChild('settingssection')
  settingPage:any


  viewProfile:boolean = false;
  stateList:any;
  districtList:any;
  villageList:any;
  employer:any;
  updateForm:any;
  jobrequestForm:any;
  win = window.sessionStorage;
  empid:any;
  labourList:any;
  specializationList:any;
  personSpecializationList:any;
  labourvillage:string;
  fadeContent:boolean = false;
  date: Date;
  labour:any;
  isRequestSent:boolean;
  hiredList:any;
  approvestatus:boolean;

  constructor(private employerService:EmployerServiceService,
    private fb:FormBuilder,private utlityServices:UtilitiesService,
    private router:Router,private utilityServices:UtilitiesService
    )
  {
    
  }
  ngAfterViewInit()
  {
    // this.hirepage.nativeElement.style.display='flex';
    this.navigateToSection("hire");
  }
  starIcons = {
    empty: '../assets/star.svg',
    half: '../assets/star-half.svg',
    full: '../assets/star-fill.svg',
  }


ngOnInit()
  {
    //get employer details
    this.employer = JSON.parse(this.win.getItem('empobj'));
    //get labours based on village
    this.getLabourByVillage();

    this.utilityServices.getSpecialization().subscribe((data)=>{
      this.specializationList = data;
    });

    this.empid = Number(this.win.getItem('empid'));
    this.utlityServices.getStates().subscribe((data)=>{
      this.stateList = data;
      this.getDistrictList();
      this.getVillageList();
    });

    this.hiredList = this.employerService.getHiredList(this.empid);
    this.hiredList.subscribe((data)=>
    {
       console.log(data);
    });

    this.updateForm = this.fb.group({
      id : [{value:this.empid,disabled:true},[Validators.required]],
      fname : [{value:this.employer.fname+' '+this.employer.lname,disabled:true},[Validators.required]],
      lname : [{value:'',disabled:true}],
      email: [{value:this.employer.email,disabled:true},[Validators.required,Validators.email]],
      phone: [{value:this.employer.phone,disabled:true},[Validators.required,Validators.pattern('[0-9]{10}')]], 
      gender: [{value:this.employer.gender,disabled:true},[Validators.required]],
      dateofbirth: [{value:this.employer.dateofbirth,disabled:true},[Validators.required]],
      state_id: [{value:this.employer.state_id,disabled:true},[Validators.required]],
      district_id: [{value:this.employer.district_id,disabled:true},[Validators.required]],
      village_id: [{value:this.employer.village_id,disabled:true,},[Validators.required,noEmptyValue]],
      place: [{value:this.employer.place,disabled:true},[Validators.required]],
      postcode: [{value:this.employer.postcode,disabled:true},[Validators.required]]
    });
  }   

  ngDoCheck()
  {
    
  }
  
  getDistrictList()
  {
    let state = this.updateForm.value.state_id;
    this.utlityServices.getDistrict(state).subscribe((data)=>{
      this.districtList = data;
    });
  }
  
  //Village List
  getVillageList()
  {
    let dist = this.updateForm.value.district_id;
    this.utlityServices.getVillage(dist).subscribe((data)=>{
      this.villageList = data;
    });
  }

  public navigateToSection(sectinIndex:string) 
  {
    window.location.hash = '';
    window.location.hash = "hire";
    this.hirePage.nativeElement.style.zIndex = -1;
    this.profilePage.nativeElement.style.zIndex = -1;
    this.settingPage.nativeElement.style.zIndex = -1;
    this.hiredPage.nativeElement.style.zIndex = -1;
    if(sectinIndex == "hire")
    {
      this.hirePage.nativeElement.style.zIndex = 1;
    }
    else if(sectinIndex == "hired")
    {
       this.hiredPage.nativeElement.style.zIndex = 1;
    }
    else if(sectinIndex == "profile")
    {
      this.profilePage.nativeElement.style.zIndex = 1;
    }
    else if(sectinIndex == "settings")
    {
      this.settingPage.nativeElement.style.zIndex = 1;
    }
  }
  
  update()
  {
    for(const field in this.updateForm.controls)
    {
      if(field != 'email')
      {
        this.updateForm.get(field).enable();
      }
    }
  }

  onUpdate()
  {
    for(const field in this.updateForm.controls)
    {
       this.updateForm.get(field).disable();
    }
    console.log();
    let name = this.updateForm.getRawValue().fname.split(" ");
    this.updateForm.get('fname').value = name[0];
    for(let i = 1;i<name.length;i++)
    {
      this.updateForm.get('lname').value += name[i];
    }
    this.employerService.updateEmployer(this.updateForm.getRawValue());
    this.employer = JSON.parse(this.win.getItem('empobj'));
    this.getLabourByVillage();
    location.reload();
  }

  getLabourByVillage()
  {
    this.employerService.getLabourByVillageId(this.employer.village_id).subscribe((data)=>{
      this.labourList = data;
    });
  }

  getLabourByVillageAndSpec(villageId:any, specId:any)
  {
    console.log(villageId.value+" "+specId.value);
    this.employerService.getLabourByVillageAndSpec(villageId.value,specId.value).subscribe((data)=>{
       console.log(data);
       this.labourList = data;
    });
  }
  enableVillageList()
  {
    this.updateForm.get('village_id').enable();
  }

  openReqPopUp(request:any,getLabour:any)
  {
     request.style.display='block';
     this.labour = getLabour;
     this.employerService.isRequestAlreadySent(this.labour.id,this.empid).subscribe((data)=>{
      this.isRequestSent = data;
      console.log(this.isRequestSent)
     });
  }

  sendRequest()
  {
    if(!this.isRequestSent)
    {
      this.isRequestSent = true;
      this.employerService.saveRequst(this.labour.id,this.empid);
    }
  }

  logout()
  {
    this.win.removeItem('empobj');
    this.router.navigate(['/log']);
  }

}
