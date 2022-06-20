import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrazilicaComponent } from './trazilica.component';

describe('TrazilicaComponent', () => {
  let component: TrazilicaComponent;
  let fixture: ComponentFixture<TrazilicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrazilicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrazilicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
