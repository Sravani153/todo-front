import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AccountDTO } from 'src/app/model/AccountDTO';
import { AccountService } from 'src/app/services/account.service';
import { UserstorageService } from 'src/app/storage/userstorage.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role']; // Only these columns will be displayed
  dataSource = new MatTableDataSource<AccountDTO>();
  selection = new SelectionModel<AccountDTO>(true, []);
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(private accountService: AccountService,
    private userStorage: UserstorageService,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.isAdmin = this.userStorage.isAdminLoggedIn();
    this.loadAccounts();
  }

  // loadAccounts(): void {
  //   this.accountService.getAllAccounts().subscribe(
  //     (accounts: AccountDTO[]) => {
  //       this.dataSource.data = accounts.map(({ password, ...account }) => account as AccountDTO); // Exclude password
  //       this.showSnackBar('All Accounts loaded successfully.', 'Close');

  //     },
  //     error => {
  //       console.error('Error loading accounts:', error);
  //     }
  //   );
  // }

  loadAccounts(): void {
    console.log('Loading accounts...');  // Log start of the data fetch process

    this.accountService.getAllAccounts().subscribe(
      (accounts: AccountDTO[]) => {
        console.log('Accounts received from service:', accounts);  // Log the received data

        // Process the data: Exclude the password field from each account
        this.dataSource.data = accounts.map(({ password, ...account }) => account as AccountDTO);

        console.log('Processed accounts (without password):', this.dataSource.data);  // Log processed data
        this.showSnackBar('All Accounts loaded successfully.', 'Close');
      },
      error => {
        console.error('Error loading accounts:', error);  // Log if there's an error
      }
    );

    console.log('loadAccounts method complete');  // Log the end of the method execution
  }


  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}
