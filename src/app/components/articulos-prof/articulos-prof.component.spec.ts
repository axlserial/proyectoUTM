import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosProfComponent } from './articulos-prof.component';

describe('ArticulosProfComponent', () => {
  let component: ArticulosProfComponent;
  let fixture: ComponentFixture<ArticulosProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
