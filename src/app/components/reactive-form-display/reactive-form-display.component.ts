import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-reactive-form-display',
  templateUrl: './reactive-form-display.component.html',
  styleUrls: ['./reactive-form-display.component.css']
})
export class ReactiveFormDisplayComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formData: any;

  ngOnInit() {
    console.log('OnInit: ReactiveFormDisplayComponent initialized.');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('OnChanges: ReactiveFormDisplayComponent changes detected.', changes);
  }

  ngOnDestroy() {
    console.log('OnDestroy: ReactiveFormDisplayComponent destroyed.');
  }
}

