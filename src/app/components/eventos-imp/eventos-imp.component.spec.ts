import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosImpComponent } from './eventos-imp.component';

describe('EventosImpComponent', () => {
  let component: EventosImpComponent;
  let fixture: ComponentFixture<EventosImpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosImpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
