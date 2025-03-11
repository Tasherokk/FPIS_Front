import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../core/services/auth.service";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(formValue: { username: string; password: string }) {
    this.errorMessage = null;
    const { username, password } = formValue;

    this.auth.login(username, password).subscribe({
      next: () => {
        if(this.auth.getUserRole() === 'student') {
          this.router.navigate(['my-courses']);
        }
        else if(this.auth.getUserRole() === 'curator') {
          this.router.navigate(['my-students']);
        }
        else this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.errorMessage = 'Логин немесе құпия сөз жарамсыз';
      }
    });
  }

  clearErrors(): void {
    this.errorMessage = null;
  }


}
