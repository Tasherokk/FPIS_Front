import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { RegisterService } from "../../core/services/register.service";

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {

}
