import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http:HttpClient) { }

  private specUrl = 'http://localhost:8090/api/getspecialization';

  private stateUrl = 'http://localhost:8090/api/getstates';

  private distUrl = 'http://localhost:8090/api/getdistrict/';

  private villageUrl = 'http://localhost:8090/api/getvillage/';


  getSpecialization(): Observable<any>
  {
    return this.http.get(this.specUrl);
  }

  getStates() : Observable<any>
  {
    return this.http.get(this.stateUrl);
  }
  getDistrict(id: number) : Observable<any>
  {
      return this.http.get(this.distUrl+id)
  }
  getVillage(id:number) : Observable<any>
  {
    return this.http.get(this.villageUrl+id)
  }
}
