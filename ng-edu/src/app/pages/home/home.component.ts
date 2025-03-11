import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, NgForm} from "@angular/forms";
import {RegisterService} from "../../core/services/register.service";
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy, OnInit{


  currentSection = -1;

  switchSection(index: number) {
    const isMobile = window.innerWidth <= 1280; // Проверяем мобильную версию
    const sections = document.querySelectorAll('section');

    if (isMobile) {
      // В мобильной версии просто прокручиваем страницу к нужному разделу
      sections[index].scrollIntoView({ behavior: 'smooth' });
    } else {
      if (index !== this.currentSection) {
        // Удаляем предыдущие классы анимации
        if (this.currentSection !== -1) {
          sections[this.currentSection].classList.remove('enter-right', 'exit-left');
          sections[this.currentSection].classList.add('exit-left');
        }
        sections[index].classList.add('enter-right');

        this.currentSection = index;
      }
    }
  }


  ngOnInit(): void {
    this.switchSection(0);
  }

  availablePairs = [
    { pair: ['WHI', 'GEO'], name: 'Дүниежүзілік тарих және География' },
    { pair: ['WHI', 'LF'], name: 'Дүниежүзілік тарих және Құқық негіздері' },
    { pair: ['GEO', 'FL'], name: 'География және Шет тілі' },
    { pair: ['BIO', 'GEO'], name: 'Биология және География' },
    { pair: ['FL', 'WHI'], name: 'Шет тілі және Дүниежүзілік тарих' },
    { pair: ['KZ', 'KL'], name: 'Қазақ тілі және Қазақ әдебиеті' },
    { pair: ['MAT', 'GEO'], name: 'Математика және География' },
    { pair: ['MAT', 'INF'], name: 'Математика және Информатика' },
    { pair: ['MAT', 'PHY'], name: 'Математика және Физика' },
    { pair: ['RU', 'RUL'], name: 'Русский язык и Русская литература' },
    { pair: ['CHE', 'BIO'], name: 'Химия және Биология' },
    { pair: ['CHE', 'PHY'], name: 'Химия және Физика' },
  ];

  selectedPair: string = '';

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      this.registerService.sendRegisterForm(formData).subscribe(
        (response) => {
          this.successAlert();
          form.reset();
        },
        (error) => {
          this.errorAlert();
        }
      );
    } else {
    }
  }


  slides = [
    {
      image: 'https://bidusdigital.ru/wp-content/uploads/2020/11/content-1024x758.png',
      title: 'Математика және Физика',
      description: '<strong>Тақырып бойынша талдауымыз</strong> – тек пәндер бойынша ғана емес, тақырыптар бойынша да білім деңгейіңді анықтауға арналған озық технологиялардың бірі, мен бәрін пайыздық көрсеткішке дейін мұқият талдаймын! Бұл бізге жеке көзқараспен білім деңгейіңе ең тиімді тапсырмаларды ұсынуға мүмкіндік береді.\n' +
        '<br>' +
        'Талдаудың дәлдігі сенің белсенділік пен платформадағы оқуыңа байланысты.',
    },
    {
      image: null,
      title: 'Биология және Химия',
      description: 'Тақырып бойынша талдауымыз – тек пәндер бойынша ғана емес, тақырыптар бойынша да білім деңгейіңді анықтауға арналған озық технологиялардың бірі, мен бәрін пайыздық көрсеткішке дейін мұқият талдаймын! Бұл бізге жеке көзқараспен білім деңгейіңе ең тиімді тапсырмаларды ұсынуға мүмкіндік береді.\n' +
        '<br>' +
        'Талдаудың дәлдігі сенің белсенділік пен платформадағы оқуыңа байланысты.',
    },
    {
      image:null,
      title: 'География және Тарих',
      description: 'Тақырып бойынша талдауымыз – тек пәндер бойынша ғана емес, тақырыптар бойынша да білім деңгейіңді анықтауға арналған озық технологиялардың бірі, мен бәрін пайыздық көрсеткішке дейін мұқият талдаймын! Бұл бізге жеке көзқараспен білім деңгейіңе ең тиімді тапсырмаларды ұсынуға мүмкіндік береді.\n' +
        '<br>' +
        'Талдаудың дәлдігі сенің белсенділік пен платформадағы оқуыңа байланысты.',
    },
    {
      image: null,
      title: 'Шет тілі және Дүниежүзі тарихы',
      description: 'Тақырып бойынша талдауымыз – тек пәндер бойынша ғана емес, тақырыптар бойынша да білім деңгейіңді анықтауға арналған озық технологиялардың бірі, мен бәрін пайыздық көрсеткішке дейін мұқият талдаймын! Бұл бізге жеке көзқараспен білім деңгейіңе ең тиімді тапсырмаларды ұсынуға мүмкіндік береді.\n' +
        '<br>' +
        'Талдаудың дәлдігі сенің белсенділік пен платформадағы оқуыңа байланысты.',
    },
    {
      image: null,
      title: 'Қазақ тілі және Әдебиет',
      description: 'Тақырып бойынша талдауымыз. Талдаудың дәлдігі сенің белсенділік пен платформадағы оқуыңа байланысты.<br>' +
        '<ol>' +
        '    <li>Введение в программирование</li>\n' +
        '    <li>Типы данных и переменные</li>\n' +
        '    <li>Условные операторы</li>\n' +
        '    <li>Циклы</li>\n' +
        '    <li>Функции</li>\n' +
        '    <li>Практическая работа</li>' +
        '  </ol>',
    },
  ];
  currentSlide = 0;
  interval: any;

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  mainVideo: string | null = 'assets/main-video.mp4';

  teachers = [
    {
      photo: 'assets/teacher1.jpeg',
      name: 'Нұрислам Бауыржанұлы',
      bio: '<strong>Xимия</strong> пәні мұғалімі.<br>' +
        'ҰБТ саласындағы тәжірибесі 4 жыл. <br>' +
        '1000+ оқушыларды жоғары нәтижеге жеткізіп, ЖОО орындарына түсуге көмектескен.'
    },
    {
      photo: 'assets/teacher2.jpg',
      name: 'Аслан Бақтыбекұлы',
      bio: '<strong>Биология</strong> пәні мұғалімі.<br>' +
        ' ҰБТ саласындағы тәжірибесі 3 жыл.<br>' +
        '800+ жуық оқушыны биология пәнінен 37+ баллға жеткізген. <br>' +
        'Оқушыларының 90% грант иегері'
    },
    {
      photo: 'assets/teacher3.jpg',
      name: 'Алма Ануарқызы',
      bio: '<strong>Математика</strong> пәні мұғалімі.<br>' +
        'ҰБТ саласындағы тәжірибесі 17 жыл.<br> ' +
        '2023-2024 оқу жылында оқушыларының 100% грант иегері атанған'
    },

  ];



  successAlert() {
    this.snackBar.open('Бізді таңдағаныңыз үшін рахмет! Біз сізге хабарласамыз...', 'Жабу', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  errorAlert() {
    this.snackBar.open('Қате орын алды. Кейінірек көруіңізді өтінеміз...', 'Жабу', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }






}
