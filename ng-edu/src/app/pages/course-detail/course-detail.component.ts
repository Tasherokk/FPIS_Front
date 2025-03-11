import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Topic, CourseService, Course} from "../../core/services/course.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  courseId!: number;
  allTopics: Topic[] = [];
  firstTopic: Topic | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // берем :id из урла
    const state = history.state as Course;
    if (state?.id) {
      this.course = state;
      this.courseId = state.id;
    } else {
      this.courseId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadCourseDetails();
    }
    // грузим все темы (где первая открытая, остальные закрытые)
    this.loadPublicTopics();
  }


  loadCourseDetails() {
    if (!this.course) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course: Course) => {
          this.course = course;
        },
        error: (err: any) => {
          console.error('Ошибка загрузки данных курса', err);
        }
      });
    }
  }


  loadPublicTopics() {
    this.courseService.getFirstTopic(this.courseId).subscribe({
      next: (topics: Topic[]) => {
        this.allTopics = topics;
        // Если массив не пуст, первая тема = topics[0]
        if (this.allTopics.length > 0) {
          this.firstTopic = this.allTopics[0];
        }
      },
      error: (err: any) => {
        console.error('Ошибка получения тем (публичный курс)', err);
      }
    });
  }
}
