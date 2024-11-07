import { TestBed } from '@angular/core/testing';

import { MyTodoLibService } from './my-todo-lib.service';

describe('MyTodoLibService', () => {
  let service: MyTodoLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTodoLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
