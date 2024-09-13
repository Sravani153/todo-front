import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from 'src/app/services/item.service';
import { UserstorageService } from 'src/app/storage/userstorage.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private userStorage: UserstorageService
  ) {
    this.itemForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      phoneNumbers: this.fb.array([]),
      bookmarked: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEdit = true;
      this.itemService.getItemById(id).subscribe(item => {
        this.itemForm.patchValue(item);
        this.phoneNumbers.clear();
        item.phoneNumbers.forEach((phoneNumber: string) => {
          this.phoneNumbers.push(this.fb.control(phoneNumber, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
        });
      });
    }
  }

  get phoneNumbers(): FormArray {
    return this.itemForm.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.fb.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
  }

  removePhoneNumber(index: number): void {
    this.phoneNumbers.removeAt(index);
  }

  onSave(): void {
    if (this.itemForm.invalid) {
      this.showSnackBar('Please fill in all required fields with valid data.', 'Close');
      return;
    }

    const item = this.itemForm.value;

    if (this.isEdit) {
      this.itemService.updateItem(item.id, item).subscribe({
        next: () => {
          this.showSnackBar('Item updated successfully!', 'Close');
          this.router.navigate(['/list']);
        },
        error: (error) => this.handleError(error)
      });
    } else {
      this.itemService.createItem(item).subscribe({
        next: () => {
          this.showSnackBar('Item created successfully!', 'Close');
          this.router.navigate(['/list']);
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleError(error: any): void {
    if (error.error && error.error.message) {
      if (error.error.message.includes('Email is already in use')) {
        this.showSnackBar('Email already exists.', 'Close');
      } else if (error.error.message.includes('Invalid phone number')) {
        this.showSnackBar('Phone number is not valid.', 'Close');
      } else {
        this.showSnackBar('An error occurred. Please try again.', 'Close');
      }
    }
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  // Custom email validator to ensure a valid email format
  private customEmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { 'invalidEmail': true };
  }

  signOut(): void {
    this.userStorage.signedOut();
  }
}
