import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresadminComponent } from './offresadmin.component';

describe('OffresadminComponent', () => {
  let component: OffresadminComponent;
  let fixture: ComponentFixture<OffresadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffresadminComponent]
    });
    fixture = TestBed.createComponent(OffresadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
