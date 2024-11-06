import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/model/item.model';
import { UserstorageService } from 'src/app/storage/userstorage.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  bookmarkedItems: MatTableDataSource<Item> = new MatTableDataSource<Item>();  // Use MatTableDataSource here

  displayedColumns: string[] = ['name', 'dateOfBirth', 'gender', 'email', 'phoneNumbers', 'actions'];
  isAdmin: boolean = false;
  isLoading: boolean = false;
  selection = new SelectionModel<Item>(true, []);

  constructor(
    private router: Router,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private userStorage: UserstorageService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.userStorage.isAdminLoggedIn();
    this.updateDisplayedColumns();
    this.loadBookmarkedItems();
  }

  // loadBookmarkedItems(): void {
  //   this.isLoading = true;
  //   this.itemService.getBookmarkedItems().subscribe(
  //     (items: Item[]) => {
  //       const bookmarked = items.filter(item => item.bookmarked);  // Filter bookmarked items
  //       this.bookmarkedItems.data = bookmarked;  // Assign filtered items to MatTableDataSource
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Failed to load bookmarked items');
  //       this.isLoading = false;
  //     }
  //   );
  // }

  loadBookmarkedItems(): void {
    this.isLoading = true;
    this.itemService.getBookmarkedItems().subscribe(
      (items: Item[]) => {
        const bookmarked = items.filter(item => item.bookmarked);  // Filter only bookmarked items
        this.bookmarkedItems = new MatTableDataSource(bookmarked);  // Assign to MatTableDataSource
        this.isLoading = false;
        this.snackBar.open('Bookmarked items loaded successfully.', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Failed to load bookmarked items');
        this.isLoading = false;
        this.snackBar.open('Failed to load bookmarked items.', 'Close', { duration: 3000 });
      }
    );
  }



  handleToggleBookmark(updatedItem: Item): void {
    if (updatedItem.bookmarked) {
      this.bookmarkedItems.data.push(updatedItem); // Add to the data source
    } else {
      this.bookmarkedItems.data = this.bookmarkedItems.data.filter(item => item.id !== updatedItem.id); // Remove from the data source
    }
  }

  updateDisplayedColumns(): void {
    if (!this.isAdmin) {
      this.displayedColumns = ['name', 'dateOfBirth', 'gender', 'email', 'phoneNumbers'];
    }
  }

  onEdit(id: string): void {
    this.isLoading = true;
    this.router.navigate(['/add'], { queryParams: { id } });
  }

  onDelete(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.isLoading = true;
      this.itemService.deleteItem(id).subscribe(() => {
        this.showSnackBar('Item deleted successfully!', 'Close');
        this.loadBookmarkedItems(); // Reload after deletion
      });
    } else {
      this.snackBar.open('Delete operation canceled', 'Close', {
        duration: 3000,
      });
    }
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
