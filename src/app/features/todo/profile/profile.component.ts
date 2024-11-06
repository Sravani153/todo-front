import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/app/environments/environment';
import { AccountDTO } from 'src/app/model/AccountDTO';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserstorageService } from 'src/app/storage/userstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: AccountDTO | undefined;
  isAdmin: boolean = false;
  allAccounts: AccountDTO[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(private http: HttpClient,
    private userStorage:UserstorageService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,

  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.checkAdminRole();
  }

  private loadUserProfile(): void {
    const email = this.userStorage.getEmail();
    if (email) {
      this.accountService.getAccountByEmail(email).subscribe(
        (profile: AccountDTO) => {
          this.profile = profile;
        },
        (error) => {
          this.showSnackBar('Error loading profile.', 'Close');
        }
      );
    } else {
      this.showSnackBar('User email not found.', 'Close');
    }
  }


  private checkAdminRole(): void {
    this.isAdmin = this.userStorage.isAdminLoggedIn();

    if (this.isAdmin) {
      this.loadAllAccounts();
    }
  }

  private loadAllAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      (accounts: AccountDTO[]) => {
        this.allAccounts = accounts;
      },
      (error) => {
        this.snackBar.open('Error loading accounts.', 'Close', { duration: 3000 });
      }
    );
  }

  deleteProfile(): void {
    if (this.profile?.email && this.profile.email !== 'admin@gmail.com') {
      this.accountService.deleteAccount(this.profile.email).subscribe(
        () => {
          this.showSnackBar('Profile deleted successfully.', 'Close');
        },
        (error) => {
          this.showSnackBar('Error deleting profile.', 'Close');
        }
      );
    } else if (this.profile?.email === 'admin@gmail.com') {
      this.showSnackBar('Admin account cannot be deleted.', 'Close');
    } else {
      this.showSnackBar('Error: Invalid profile email.', 'Close');
    }
  }


  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

}
