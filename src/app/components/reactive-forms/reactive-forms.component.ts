import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent {
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

