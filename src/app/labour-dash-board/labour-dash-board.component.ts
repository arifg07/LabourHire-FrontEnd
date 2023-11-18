import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LabourServicesService } from '../labour-services.service';

@Component({
  selector: 'app-labour-dash-board',
  templateUrl: './labour-dash-board.component.html',
  styleUrls: ['./labour-dash-board.component.css']
})
export class LabourDashBoardComponent 
{
  @ViewChild('requests')
  requestPage:ElementRef;

  @ViewChild('profile')
  profilePage:ElementRef;

  @ViewChild('settings')
  settingsPage:ElementRef;

  requestList:any;
  test:boolean = true;

  constructor(private router:Router, private labourService:LabourServicesService)
  {
  }

  ngOnInit()
  {
      this.requestList = this.labourService.getRequestList(2); 
  }
  ngAfterViewInit()
  {
    this.navigateToSection('request');
    window.location.hash = '';
    window.location.hash = 'requests';
  }

  navigateToSection(page:string)
  {
     this.requestPage.nativeElement.style.zIndex = -1;
     this.profilePage.nativeElement.style.zIndex = -1;
     this.settingsPage.nativeElement.style.zIndex = -1;

     if(page == 'request')
     {
       this.requestPage.nativeElement.style.zIndex = 0;
       console.log("Inside request");
     }
     else if(page == 'profile')
     {
      this.profilePage.nativeElement.style.zIndex = 0;
      console.log("Inside profile");
     }
     else if(page == 'settings')
     {
      this.settingsPage.nativeElement.style.zIndex = 0;
      console.log("Inside settings");
     }
  }

  logout()
  {
    this.router.navigate(['/log']);
  }
}
