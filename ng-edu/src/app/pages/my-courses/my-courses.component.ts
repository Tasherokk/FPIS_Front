// my-courses.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../../core/services/course.service';
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent implements OnInit {
  myCourses: Course[] = [];
  isLoading = false;
  isMobile = false;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 1200;
    this.fetchMyCourses();
  }

  fetchMyCourses() {
    this.isLoading = true;
    this.courseService.getMyCourses().subscribe({
      next: (data) => {
        this.myCourses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Ошибка при загрузке моих курсов', err);
        this.isLoading = false;
      }
    });
  }
}
