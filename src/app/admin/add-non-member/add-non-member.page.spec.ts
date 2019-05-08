import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonMemberPage } from './add-non-member.page';

describe('AddNonMemberPage', () => {
  let component: AddNonMemberPage;
  let fixture: ComponentFixture<AddNonMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNonMemberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNonMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
