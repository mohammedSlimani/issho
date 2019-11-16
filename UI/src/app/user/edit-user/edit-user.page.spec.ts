import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPage } from './edit-user.page';

describe('EditUserPage', () => {
  let component: EditUserPage;
  let fixture: ComponentFixture<EditUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
