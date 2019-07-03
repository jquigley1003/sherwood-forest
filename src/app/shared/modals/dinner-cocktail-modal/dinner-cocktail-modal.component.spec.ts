import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinnerCocktailModalComponent } from './dinner-cocktail-modal.component';

describe('DinnerCocktailModalComponent', () => {
  let component: DinnerCocktailModalComponent;
  let fixture: ComponentFixture<DinnerCocktailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinnerCocktailModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinnerCocktailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
