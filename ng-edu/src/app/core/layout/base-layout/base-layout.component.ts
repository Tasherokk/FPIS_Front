import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-base-layout',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css'
})

export class BaseLayoutComponent {}
function adjustPage() {
  document.documentElement.style.height = `${window.innerHeight}px`;
}

window.addEventListener('resize', adjustPage);
adjustPage();
