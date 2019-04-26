import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandsPage } from './islands.page';

describe('IslandsPage', () => {
  let component: IslandsPage;
  let fixture: ComponentFixture<IslandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
