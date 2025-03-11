import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../core/services/register.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css'],
})
export class RegistrationsComponent implements OnInit {
  registrations: any[] = [];
  errorMessage: string | null = null;

  constructor(private registerService: RegisterService) {}

  ngOnInit() {
    this.fetchTodayRegistrations();
  }

  fetchTodayRegistrations() {
    this.registerService.getTodayRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load registrations';
        console.error(err);
      },
    });
  }
}
