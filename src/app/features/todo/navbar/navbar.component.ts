import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserstorageService } from 'src/app/storage/userstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSmallScreen: boolean = false;
  showNavbar: boolean = false;
  @Input() isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStorage: UserstorageService,
  ) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 600;
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  signOut(): void {
    this.authService.logout().subscribe({
      next: () => {
        const userRole = this.userStorage.getUserRole();
        this.userStorage.clearSession();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.userStorage.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }
}
