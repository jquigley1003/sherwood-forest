import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeWatchPage } from './tree-watch.page';

describe('TreeWatchPage', () => {
  let component: TreeWatchPage;
  let fixture: ComponentFixture<TreeWatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeWatchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeWatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
