import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRegistraionComponent } from './emp-registraion.component';

describe('EmpRegistraionComponent', () => {
  let component: EmpRegistraionComponent;
  let fixture: ComponentFixture<EmpRegistraionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpRegistraionComponent]
    });
    fixture = TestBed.createComponent(EmpRegistraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
