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
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    public snackBar: MatSnackBar,
    private userStorage: UserstorageService
  ) {
    this.itemForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dateOfBirth: ['', [Validators.required, this.futureDateValidator]], // Add custom validator
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator]],
      phoneNumbers: this.fb.array([]),
      bookmarked: [false]
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.userStorage.isAdminLoggedIn();
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loadItem(id);
    }
  }

  public loadItem(id: string): void {
    this.isLoading = true;
    this.itemService.getItemById(id).subscribe(item => {
      this.itemForm.patchValue(item);
      this.phoneNumbers.clear();
      item.phoneNumbers.forEach((phoneNumber: string) => {
        this.phoneNumbers.push(this.fb.control(phoneNumber, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
      });
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
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
    this.isLoading = true;
    console.log(this.itemForm.value);

    const saveOperation = this.isEdit
      ? this.itemService.updateItem(item.id, item)
      : this.itemService.createItem(item);

    saveOperation.subscribe({
      next: () => {
        this.showSnackBar(`Item ${this.isEdit ? 'updated' : 'created'} successfully!`, 'Close');
        this.router.navigateByUrl('/list');

      },
      error: (error) => this.handleError(error),
      complete: () => this.isLoading = false
    });
  }

  public handleError(error: any): void {
    if (error.error && error.error.message) {
      if (error.error.message.includes('Email is already in use')) {
        this.showSnackBar('Email already exists.', 'Close');
      } else if (error.error.message.includes('Invalid phone number')) {
        this.showSnackBar('Phone number is not valid.', 'Close');
      } else {
        this.showSnackBar('An error occurred. Please try again.', 'Close');
      }
    }
    this.isLoading = false;
  }

  public showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  // Custom email validator to ensure a valid email format
  private customEmailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Ensure email ends with @gmail.com
    const valid = emailRegex.test(control.value);
    return valid ? null : { 'invalidEmail': true };
  }

  // Custom validator to prevent future date selection
  private futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    return selectedDate > today ? { 'futureDate': true } : null;
  }
}
