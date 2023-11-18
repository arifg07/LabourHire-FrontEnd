import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourDashBoardComponent } from './labour-dash-board.component';

describe('LabourDashBoardComponent', () => {
  let component: LabourDashBoardComponent;
  let fixture: ComponentFixture<LabourDashBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabourDashBoardComponent]
    });
    fixture = TestBed.createComponent(LabourDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
