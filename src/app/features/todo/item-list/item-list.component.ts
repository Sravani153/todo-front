import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/model/item.model';
import { UserstorageService } from 'src/app/storage/userstorage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchValue: string = '';
  displayedColumns: string[] = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'bookmarked', 'actions'];
  isAdmin: boolean = false;
  isUser: boolean = false;
  dataSource = new MatTableDataSource<Item>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private snackBar: MatSnackBar,
    private userStorage: UserstorageService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.userStorage.isAdminLoggedIn();
    this.isUser = this.userStorage.isUserLoggedIn();
    this.updateDisplayedColumns();
    this.loadItems();
  }

  updateDisplayedColumns(): void {
    if (this.isAdmin) {
      this.displayedColumns = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'bookmarked', 'actions'];
    } else {
      this.displayedColumns = ['name', 'dob', 'gender', 'email', 'phoneNumbers', 'bookmarked'];
    }
  }

  loadItems(): void {
    this.itemService.getAllItems().subscribe(
      (items) => {
        this.items = items;
        this.filteredItems = [...this.items];
        this.dataSource.data = this.filteredItems;
        this.dataSource.paginator = this.paginator; // Set the paginator
        this.showSnackBar('Items loaded successfully.', 'Close');
      },
      (error) => {
        this.showSnackBar('Failed to load items.', 'Close');
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Item, filter: string): boolean => {
      const nameMatches = data.name.toLowerCase().includes(filter);
      const dob = new Date(data.dateOfBirth);
      const dobString = `${dob.getMonth() + 1} ${dob.getDate()} ${dob.getFullYear()}`.toLowerCase();
      const dobMonthName = dob.toLocaleString('default', { month: 'short' }).toLowerCase();
      const dobMatches = dobString.includes(filter) || dobMonthName.includes(filter);

      return nameMatches || dobMatches;
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(): void {
    this.searchValue = '';
      this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
      this.showSnackBar('Search cleared.', 'Close');
  }


  toggleBookmarked(item: Item): void {
    const updatedBookmarkStatus = !item.bookmarked;
    this.itemService.toggleBookmark(item.id, updatedBookmarkStatus).subscribe(
      () => {
        item.bookmarked = updatedBookmarkStatus;
        this.loadItems();
        this.showSnackBar(`Bookmark status updated to ${updatedBookmarkStatus ? 'bookmarked' : 'unbookmarked'}.`, 'Close');
      },
      (error) => {
        this.showSnackBar('Failed to update bookmark status.', 'Close');
      }
    );
  }

  onEdit(id: string): void {
    this.router.navigate(['/add'], { queryParams: { id } });
  }

  onDelete(id: string): void {
    this.itemService.deleteItem(id).subscribe(() => {
      this.showSnackBar('Item deleted successfully!', 'Close');
      this.loadItems();
    });
  }

  signOut(): void {
    this.userStorage.signedOut();
    this.router.navigate(['/login']);
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
