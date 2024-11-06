import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/model/item.model';
import { UserstorageService } from 'src/app/storage/userstorage.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() displayedColumns: string[] = ["select", "name", "dateOfBirth", "gender", "email", "phoneNumbers", "bookmarked", "actions"];

  items: Item[] = [];
  searchValue: string = '';
  isAdmin: boolean = false;
  isLoading: boolean = false;
  dataSource = new MatTableDataSource<Item>([]);
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
    this.loadItems();
  }

  updateDisplayedColumns(): void {
    if (!this.isAdmin) {
      this.displayedColumns = ['name', 'dateOfBirth', 'gender', 'email', 'phoneNumbers', 'bookmarked'];
    }
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
        this.dataSource.data = this.items;
        this.isLoading = false;
        this.showSnackBar('Items loaded successfully.', 'Close');
      },
      (error) => {
        this.isLoading = false;
        this.showSnackBar('Failed to load items.', 'Close');
      }
    );
  }

  onEdit(id: string): void {
    this.isLoading=true;
    this.router.navigate(['/add'], { queryParams: { id } });
  }

  onDelete(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      this.isLoading = true;
      this.itemService.deleteItem(id).subscribe(
        () => {
          this.showSnackBar('Item deleted successfully!', 'Close');
          this.loadItems();
        },
        (error) => {
          this.isLoading = false;
          this.showSnackBar('Failed to delete item.', 'Close');
        }
      );
    } else {
      this.showSnackBar('Delete operation canceled', 'Close');
    }
  }

  exportToExcel(): void {
    const filteredItems = this.dataSource.filteredData as Item[];
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredItems.map(item => ({
      Name: item.name,
      'Date of Birth': item.dateOfBirth,
      Gender: item.gender,
      Email: item.email,
      'Phone Numbers': item.phoneNumbers.join(', '),
      Bookmarked: item.bookmarked ? 'Yes' : 'No',
    })));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Items');
    XLSX.writeFile(wb, 'items.xlsx');
  }

  deleteSelected(): void {
    const selectedIds = this.selection.selected.map((item) => (item as any).id as string);

    if (selectedIds.length === 0) {
      this.showSnackBar('No items selected for deletion.', 'Close');
      return;
    }

    const confirmation = confirm(`Are you sure you want to delete ${selectedIds.length} items?`);
    if (confirmation) {
      this.isLoading = true;
      this.itemService.deleteItems(selectedIds).subscribe(
        () => {
          this.showSnackBar('Selected items deleted successfully!', 'Close');
          this.loadItems(); // Refresh items after deletion
          this.selection.clear();
          this.isLoading = false;
        },
        () => {
          this.showSnackBar('Failed to delete selected items.', 'Close');
          this.isLoading = false;
        }
      );
    }
  }

  toggleBookmarked(item: Item): void {
    const updatedBookmarkStatus = !item.bookmarked;

    item.bookmarked = updatedBookmarkStatus;

    this.dataSource.data = [...this.dataSource.data]; // Trigger re-render

    this.itemService.toggleBookmark(item.id, updatedBookmarkStatus).subscribe(
      (updatedItem: Item) => {
        const index = this.items.findIndex(i => i.id === updatedItem.id);
        if (index !== -1) {
          this.items[index] = updatedItem;
          this.dataSource.data = [...this.items];
        }
        this.showSnackBar(`Bookmark status updated to ${updatedBookmarkStatus ? 'bookmarked' : 'unbookmarked'}.`, 'Close');
      },
      (error) => {
        item.bookmarked = !updatedBookmarkStatus;
        this.dataSource.data = [...this.dataSource.data];
        this.showSnackBar('Failed to update bookmark status.', 'Close');
      }
    );
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Item, filter: string): boolean => {
      return this.matchesName(data, filter) || this.matchesDateOfBirth(data, filter);
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private matchesName(data: Item, filter: string): boolean {
    return data.name.toLowerCase().includes(filter);
  }

  private matchesDateOfBirth(data: Item, filter: string): boolean {
    const dob = new Date(data.dateOfBirth);
    const dobString = `${dob.getMonth() + 1} ${dob.getDate()} ${dob.getFullYear()}`.toLowerCase();
    const dobMonthName = dob.toLocaleString('default', { month: 'short' }).toLowerCase();
    return dobString.includes(filter) || dobMonthName.includes(filter);
  }

  clearSearch(): void {
    this.searchValue = '';
      this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
      this.showSnackBar('Search cleared.', 'Close');
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
