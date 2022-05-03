import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesViceImpComponent } from './actividades-vice-imp.component';

describe('ActividadesViceImpComponent', () => {
  let component: ActividadesViceImpComponent;
  let fixture: ComponentFixture<ActividadesViceImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesViceImpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesViceImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
