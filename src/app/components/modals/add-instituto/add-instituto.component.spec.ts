import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutoComponent } from './add-instituto.component';

describe('AddInstitutoComponent', () => {
  let component: AddInstitutoComponent;
  let fixture: ComponentFixture<AddInstitutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstitutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
