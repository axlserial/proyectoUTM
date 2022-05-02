import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosDirecComponent } from './articulos-direc.component';

describe('ArticulosDirecComponent', () => {
  let component: ArticulosDirecComponent;
  let fixture: ComponentFixture<ArticulosDirecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosDirecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosDirecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
