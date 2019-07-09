import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetModalComponent } from './pet-modal.component';

describe('PetModalComponent', () => {
  let component: PetModalComponent;
  let fixture: ComponentFixture<PetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
