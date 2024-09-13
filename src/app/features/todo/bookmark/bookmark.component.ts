import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/model/item.model';
import { UserstorageService } from 'src/app/storage/userstorage.service';

  @Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
  })
  export class BookmarkComponent implements OnInit {
    bookmarkedItems: Item[] = [];
    displayedColumns: string[] = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'actions'];
    isAdmin: boolean = false;
    isUser: boolean = false;

    constructor(private router: Router, private itemService:ItemService, private snackBar: MatSnackBar, private userStorage: UserstorageService ) {}

    ngOnInit(): void {
      this.isAdmin = this.userStorage.isAdminLoggedIn();
      this.isUser = this.userStorage.isUserLoggedIn();
      this.updateDisplayedColumns();
      this.loadBookmarkedItems();
    }

    loadBookmarkedItems(): void {
      this.itemService.getBookmarkedItems().subscribe(
        (items) => {
          this.bookmarkedItems = items;
          this.showSnackBar('Bookmarked items loaded successfully.', 'Close');
        },
        (error) => {
          this.showSnackBar('Failed to load bookmarked items.', 'Close');
        }
      );
    }

    updateDisplayedColumns(): void {
      if (this.isAdmin) {
        this.displayedColumns = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'actions'];
      } else {
        this.displayedColumns = ['name', 'dob', 'gender', 'email', 'phoneNumbers',];
      }
    }

    onEdit(id: string): void {
      this.router.navigate(['/add'], { queryParams: { id } });
    }

    onDelete(id: string): void {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadBookmarkedItems();
        this.showSnackBar('Item deleted successfully!', 'Close');
      });
    }


  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  signOut(): void {
    this.userStorage.signedOut();
    this.router.navigate(['/login']);
  }
}


