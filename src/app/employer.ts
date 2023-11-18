export class Employer 
{
    fname: string;
    lname: string;
    email: string;
    phone: number;
    password: string;
    gender: string;
    dateofbirth:string;
    state_id:number;
    district_id: number;
    village_id: number;
    place: string;
    postcode: number;

    constructor(empForm:any)
    {
      this.fname = empForm.fname;
      this.lname = empForm.lname;
      this.phone = empForm.phone;
      this.email = empForm.email;
      this.password = empForm.password;
      this.gender = empForm.gender;
      this.dateofbirth = empForm.dateofbirth;
      this.state_id = Number(empForm.state_id);
      this.district_id = Number(empForm.district_id);
      this.village_id = Number(empForm.village_id);
      this.place = empForm.place;
      this.postcode = Number(empForm.postcode);
    }
    
  }