import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosViceImpComponent } from './eventos-vice-imp.component';

describe('EventosViceImpComponent', () => {
  let component: EventosViceImpComponent;
  let fixture: ComponentFixture<EventosViceImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosViceImpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosViceImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
