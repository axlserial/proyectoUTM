import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosImpComponent } from './articulos-imp.component';

describe('ArticulosImpComponent', () => {
  let component: ArticulosImpComponent;
  let fixture: ComponentFixture<ArticulosImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosImpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
