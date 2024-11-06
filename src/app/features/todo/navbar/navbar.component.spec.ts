import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserstorageService } from 'src/app/storage/userstorage.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userStorageSpy: jasmine.SpyObj<UserstorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const userSpy = jasmine.createSpyObj('UserstorageService', ['getUserRole', 'clearSession']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: UserstorageService, useValue: userSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userStorageSpy = TestBed.inject(UserstorageService) as jasmine.SpyObj<UserstorageService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isSmallScreen to true if window width is less than or equal to 600px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    component.checkScreenSize();
    expect(component.isSmallScreen).toBeTrue();
  });

  it('should set isSmallScreen to false if window width is greater than 600px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(800);
    component.checkScreenSize();
    expect(component.isSmallScreen).toBeFalse();
  });

  it('should toggle showNavbar on calling toggleNavbar', () => {
    component.showNavbar = false;
    component.toggleNavbar();
    expect(component.showNavbar).toBeTrue();

    component.toggleNavbar();
    expect(component.showNavbar).toBeFalse();
  });

  it('should navigate to login and clear session on successful sign-out', fakeAsync(() => {
    authServiceSpy.logout.and.returnValue(of(null));
    component.signOut();
    tick();
    expect(userStorageSpy.clearSession).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should navigate to login and clear session on sign-out failure', fakeAsync(() => {
    authServiceSpy.logout.and.returnValue(throwError(() => new Error('Logout failed')));
    component.signOut();
    tick();
    expect(userStorageSpy.clearSession).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should display "Add" button only for admin users', () => {
    component.isAdmin = true;
    fixture.detectChanges();
    const addButton = fixture.debugElement.query(By.css('.custom-fab'));
    expect(addButton).toBeTruthy(); // Button should be present

    component.isAdmin = false;
    fixture.detectChanges();
    const hiddenAddButton = fixture.debugElement.query(By.css('.custom-fab'));
    expect(hiddenAddButton).toBeFalsy(); // Button should not be present
  });
});
