import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsGroupsPage } from './clubs-groups.page';

describe('ClubsGroupsPage', () => {
  let component: ClubsGroupsPage;
  let fixture: ComponentFixture<ClubsGroupsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsGroupsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsGroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
