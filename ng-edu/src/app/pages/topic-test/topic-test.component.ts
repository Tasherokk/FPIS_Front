import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../../core/services/course.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../core/services/auth.service";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-topic-test',
  templateUrl: './topic-test.component.html',
  styleUrls: ['./topic-test.component.css'],
})
export class TopicTestComponent {
  @Input() topicId: any;
  @Input() test: any; // Получаем тестовые данные
  @Input() hasNextTopic: boolean = false; // Если есть следующая тема
  @Output() submit = new EventEmitter<void>(); // Для сабмита
  @Output() nextTopic = new EventEmitter<void>(); // Переход к следующей теме

  currentQuestionIndex: number = 0;
  answers: { [key: number]: number } = {}; // Храним ответы {вопрос: ответ}
  showResults: boolean = false;
  score: number = 0;
  passed: boolean = false;
  answersDetail: any[] = []; // Храним информацию о правильности ответов

  constructor(
    private courseService: CourseService,
  ) {}

  get questions() {
    return this.test.questions;
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  selectAnswer(answerId: number): void {
    this.answers[this.currentQuestionIndex] = answerId;
  }

  allQuestionsAnswered(): boolean {
    return Object.keys(this.answers).length === this.questions.length;
  }

  submitTest(): void {
    const answersArray = Object.keys(this.answers).map((questionIndex) => ({
      question_id: this.questions[+questionIndex].id,
      answer_id: this.answers[+questionIndex],
    }));

    this.courseService.submitTest(this.topicId, answersArray).subscribe({
      next: (result: any) => {
        this.showResults = true;
        this.score = result.score;
        this.passed = result.passed;
        this.answersDetail = result.answers_detail; // Сохраняем детали ответов
        if(this.passed) this.submit.emit();
      },
      error: (error: any) => {
        console.error('Ошибка отправки теста:', error);
      },
    });
  }

  restartTest(): void {
    this.answers = {};
    this.showResults = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.passed = false;
  }

  goToNextTopic(): void {
    this.nextTopic.emit();
  }

  // Метод для проверки, правильный ли ответ
  isCorrectAnswer(questionIndex: number): boolean {
    if (this.showResults) {
      const questionDetails = this.answersDetail.find(
        (detail) => detail.question_id === this.questions[questionIndex].id
      );
      return questionDetails ? questionDetails.answered_correctly : false;
    }
    return false;
  }


}
