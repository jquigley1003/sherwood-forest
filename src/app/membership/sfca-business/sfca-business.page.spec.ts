import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcaBusinessPage } from './sfca-business.page';

describe('SfcaBusinessPage', () => {
  let component: SfcaBusinessPage;
  let fixture: ComponentFixture<SfcaBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfcaBusinessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfcaBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
