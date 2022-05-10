import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesImpComponent } from './actividades-imp.component';

describe('ActividadesImpComponent', () => {
  let component: ActividadesImpComponent;
  let fixture: ComponentFixture<ActividadesImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesImpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
