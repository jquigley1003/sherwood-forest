import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerryFolkModalComponent } from './merry-folk-modal.component';

describe('MerryFolkModalComponent', () => {
  let component: MerryFolkModalComponent;
  let fixture: ComponentFixture<MerryFolkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerryFolkModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerryFolkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
