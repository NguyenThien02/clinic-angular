import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateProfileComponent } from './doctor-update-profile.component';

describe('DoctorUpdateProfileComponent', () => {
  let component: DoctorUpdateProfileComponent;
  let fixture: ComponentFixture<DoctorUpdateProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorUpdateProfileComponent]
    });
    fixture = TestBed.createComponent(DoctorUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
