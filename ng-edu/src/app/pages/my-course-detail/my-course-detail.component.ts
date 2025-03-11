// my-course-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Course, CourseService, Topic} from '../../core/services/course.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import {TopicTestComponent} from "../topic-test/topic-test.component";

@Component({
  standalone: true,
  imports: [CommonModule, TopicTestComponent],
  selector: 'app-my-course-detail',
  templateUrl: './my-course-detail.component.html',
  styleUrls: ['./my-course-detail.component.scss']
})
export class MyCourseDetailComponent implements OnInit {
  courseId!: number;
  course: Course | null = null;
  topics: Topic[] = [];
  selectedTopic: Topic | null = null;  // текущая выбранная тема (данные для показа)
  errorMessage = '';
  isLastTopic: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const state = history.state as Course;
    if (state?.id) {
      this.course = state;
      this.courseId = state.id;
    } else {
      this.courseId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadCourseDetails();
      console.log(this.route.snapshot.paramMap.get('id'));
    }
    this.fetchTopics();
  }

  fetchTopics() {
    this.courseService.getCourseTopics(this.courseId).subscribe({
      next: (data) => {
        this.topics = data;
        // По умолчанию выбираем первую тему (если она есть)
        if (!this.selectedTopic && this.topics.length > 0) {
          this.onSelectTopic(this.topics[0]);
        }
      },
      error: (err) => {
        this.errorMessage = 'Ошибка при загрузке тем курса';
      },
    });
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

  onSelectTopic(topic: Topic) {
    this.selectedTopic = topic;
    this.loadTopicDetail(topic.id);
    const currentIndex = this.topics.findIndex((t) => t.id === topic.id);
    this.isLastTopic = currentIndex === this.topics.length - 1;
  }

  loadTopicDetail(topicId: number) {
    this.http
      .get<Topic>(`/api/courses/topics/${topicId}/`, {
        headers: this.auth.getAuthHeaders(),
      })
      .subscribe({
        next: (fullTopicData) => {
          this.selectedTopic = fullTopicData;
        },
        error: (err) => {
          this.errorMessage = 'Ошибка при загрузке деталей темы';
        },
      });
  }

  onTestSubmit(): void {
    if (this.selectedTopic) {
      this.fetchTopics();
    }
  }

  goToNextTopic(): void {
    const nextTopicIndex = this.topics.findIndex((t) => t.id === this.selectedTopic?.id) + 1;
    if (nextTopicIndex < this.topics.length) {
      // this.selectedTopic = this.topics[nextTopicIndex];
      this.onSelectTopic(this.topics[nextTopicIndex]);
    }
  }


}
