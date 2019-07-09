import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrResidentModalComponent } from './jr-resident-modal.component';

describe('JrResidentModalComponent', () => {
  let component: JrResidentModalComponent;
  let fixture: ComponentFixture<JrResidentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrResidentModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrResidentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
