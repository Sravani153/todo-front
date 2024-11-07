import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTodoLibComponent } from './my-todo-lib.component';

describe('MyTodoLibComponent', () => {
  let component: MyTodoLibComponent;
  let fixture: ComponentFixture<MyTodoLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyTodoLibComponent]
    });
    fixture = TestBed.createComponent(MyTodoLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
