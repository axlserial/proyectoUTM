import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDirecComponent } from './actividades-direc.component';

describe('ActividadesDirecComponent', () => {
  let component: ActividadesDirecComponent;
  let fixture: ComponentFixture<ActividadesDirecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesDirecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesDirecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
