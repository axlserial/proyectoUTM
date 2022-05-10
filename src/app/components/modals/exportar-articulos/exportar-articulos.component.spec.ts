import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarArticulosComponent } from './exportar-articulos.component';

describe('ExportarArticulosComponent', () => {
  let component: ExportarArticulosComponent;
  let fixture: ComponentFixture<ExportarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportarArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
