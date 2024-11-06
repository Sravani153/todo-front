import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/model/item.model';
import { UserstorageService } from 'src/app/storage/userstorage.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent<T extends Item> implements OnInit {
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  @Input() displayedColumns: string[] = [];
  @Input() selection: SelectionModel<T>;
  @Input() isBookmarkedPage: boolean = false;

  @Output() toggleBookmark = new EventEmitter<T>();
  @Output() editItem = new EventEmitter<string>();
  @Output() deleteItem = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  items: Item[] = [];
  bookmarkedItems: Item[] = [];
  isLoading: boolean = false;
  isAdmin: boolean = false;

  constructor(private itemService: ItemService, private snackBar: MatSnackBar, private userStorage: UserstorageService) {
    this.dataSource = new MatTableDataSource<T>();
    this.selection = new SelectionModel<T>(true, []);
  }

  ngOnInit(): void {
    this.isAdmin = this.userStorage.isAdminLoggedIn();
    this.dataSource.sort = this.sort;
    this.loadItems();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.sort.active = 'name'; // Default sorting by 'name'
      this.sort.direction = 'asc'; // Default ascending order
    });
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getAllItems().subscribe(
      (items: Item[]) => {
        this.items = items;
        // If it's the Bookmarked page, filter only bookmarked items
        if (this.isBookmarkedPage) {
          this.bookmarkedItems = items.filter(item => item.bookmarked);
          this.dataSource.data = this.bookmarkedItems as unknown as T[];
        } else {
          this.dataSource.data = this.items as unknown as T[];
        }
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        this.showSnackBar('Items loaded successfully.', 'Close');
      },
      (error) => {
        this.isLoading = false;
        this.showSnackBar('Failed to load items.', 'Close');
      }
    );
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise, clear selection. */
  toggleAllSelection(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  onToggleBookmark(element: T): void {
    this.toggleBookmark.emit(element);
  }

  onEdit(id: string): void {
    this.editItem.emit(id);
  }

  onDelete(id: string): void {
    this.deleteItem.emit(id);
    // Optional: Refresh the items after deletion
    this.loadItems();
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
