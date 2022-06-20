import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasDetailComponent } from './oglas-detail.component';

describe('OglasDetailComponent', () => {
  let component: OglasDetailComponent;
  let fixture: ComponentFixture<OglasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OglasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OglasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
