import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false; // Управление состоянием меню

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  isStudent() {
    return this.auth.getUserRole() === 'student';
  }

  isCurator() {
    return this.auth.getUserRole() === 'curator';
  }

  isSeller() {
    return this.auth.getUserRole() === 'seller';
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

  toggleMenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
