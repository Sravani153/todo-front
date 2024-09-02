import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item.model';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
  })
  export class BookmarkComponent implements OnInit {
    bookmarkedItems: Item[] = [];
    displayedColumns: string[] = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'actions'];

    constructor(private router: Router, private itemService:ItemService, private snackBar: MatSnackBar ) {}

    ngOnInit(): void {
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
}


