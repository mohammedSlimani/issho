import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostPage } from './new-post.page';

describe('NewPostPage', () => {
  let component: NewPostPage;
  let fixture: ComponentFixture<NewPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
