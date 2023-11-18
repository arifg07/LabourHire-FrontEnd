import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourRegistrationComponent } from './labour-registration.component';

describe('LabourRegistrationComponent', () => {
  let component: LabourRegistrationComponent;
  let fixture: ComponentFixture<LabourRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabourRegistrationComponent]
    });
    fixture = TestBed.createComponent(LabourRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
