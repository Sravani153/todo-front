import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  form: FormGroup;
  submitted: boolean = false;
  formData: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      age: [''],
      dob: [''],
      password: ['']

    });
  }

  onSubmit() {
    this.submitted = true;
    alert('Form Submitted Successfully!');
    this.formData = this.form.value;
  }
}
