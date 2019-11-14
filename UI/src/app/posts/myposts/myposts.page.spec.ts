import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostsPage } from './myposts.page';

describe('MypostsPage', () => {
  let component: MypostsPage;
  let fixture: ComponentFixture<MypostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
