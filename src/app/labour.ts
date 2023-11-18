
export class Labour {
    fname: string;
    lname: string;
    phone: string;
    password: string;
    gender: string;
    dateofbirth: Date;
    stateId:number;
    districtId:number;
    villageId: number;
    place: string;
    postcode: number;  
    specializationId:number; 
    hourlycharges:number;

    constructor(labourForm : any)
    {
      this.fname = labourForm.fname;
      this.lname = labourForm.lname;
      this.phone = labourForm.phone;
      this.password = labourForm.password;
      this.gender = labourForm.gender;
      this.dateofbirth = labourForm.dob;
      this.stateId = Number(labourForm.stateId);
      this.districtId = Number(labourForm.districtId);
      this.villageId = Number(labourForm.villageId);
      this.place = labourForm.place;
      this.postcode = Number(labourForm.postcode);
      this. specializationId = labourForm.specializationId;
      this.hourlycharges = labourForm.hourlycharges;
    }

  }
  