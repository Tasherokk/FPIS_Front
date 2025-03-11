// courses.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Course, CourseService} from "../../core/services/course.service";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.fetchCourses();
  }
  // courses = [
  //   {
  //     id: 1,
  //     title: "Mathematics for Beginners",
  //     description: "An introductory course for young learners.",
  //     course_type: "student",
  //     sub_type: "grade1",
  //     img: 'assets/math.png',
  //   },
  //   {
  //     id: 2,
  //     title: "Advanced Physics",
  //     description: "An in-depth look at physics for aspiring scientists.",
  //     course_type: "teacher",
  //     sub_type: "grade2",
  //     img: 'assets/physics.png',
  //   },
  //   {
  //     id: 3,
  //     title: "History Essentials",
  //     description: "Understand the key events of world history.",
  //     course_type: "student",
  //     sub_type: "grade1",
  //     img: null,
  //   },
  //   {
  //     id: 4,
  //     title: "Mathematics for Beginners",
  //     description: "An introductory course for young learners.",
  //     course_type: "student",
  //     sub_type: "grade1",
  //     img: null,
  //   },
  //   {
  //     id: 5,
  //     title: "Advanced Physics",
  //     description: "An in-depth look at physics for aspiring scientists.",
  //     course_type: "teacher",
  //     sub_type: "grade2",
  //     img: null,
  //   },
  //   {
  //     id: 6,
  //     title: "History Essentials",
  //     description: "Understand the key events of world history.",
  //     course_type: "student",
  //     sub_type: "grade1",
  //     img: null,
  //   },
  //   {
  //     id: 7,
  //     title: "Mathematics for Beginners",
  //     description: "An introductory course for young learners.",
  //     course_type: "student",
  //     sub_type: "grade1",
  //     img: null,
  //   },
  //   {
  //     id: 8,
  //     title: "Advanced Physics",
  //     description: "An in-depth look at physics for aspiring scientists.",
  //     course_type: "teacher",
  //     sub_type: "grade2",
  //     img: null,
  //   },
  //   {
  //     id: 9,
  //     title: "History Essentials",
  //     description: "Understand the key events of world history.",
  //     course_type: "student",
  //     sub_type: "grade1",
  //     img: null,
  //   },
  // ];


  fetchCourses() {
    this.isLoading = true;
    this.errorMessage = '';
    this.courseService.getPublicCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Ошибка при загрузке курсов.';
        this.isLoading = false;
      }
    });
  }
}
