import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormDisplayComponent } from './reactive-form-display.component';

describe('ReactiveFormDisplayComponent', () => {
  let component: ReactiveFormDisplayComponent;
  let fixture: ComponentFixture<ReactiveFormDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveFormDisplayComponent]
    });
    fixture = TestBed.createComponent(ReactiveFormDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
