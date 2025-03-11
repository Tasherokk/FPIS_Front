// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './core/layout/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { MyStudentsComponent } from './pages/my-students/my-students.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuard} from "./core/guards/auth.guard";
import {CourseDetailComponent} from "./pages/course-detail/course-detail.component";
import {MyCourseDetailComponent} from "./pages/my-course-detail/my-course-detail.component";
import {RegistrationsComponent} from "./pages/registrations/registrations.component";

export const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      // при переходе на '/', рендерим HomeComponent внутри BaseLayout
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:id', component: CourseDetailComponent },
      {
        path: 'my-courses',
        component: MyCoursesComponent,
        canActivate: [AuthGuard],
        data: { role: 'student' }
      },
      {
        path: 'my-courses/:id',
        component: MyCourseDetailComponent,
        canActivate: [AuthGuard],
        data: { role: 'student' }
      },
      {
        path: 'my-students',
        component: MyStudentsComponent,
        canActivate: [AuthGuard],
        data: { role: 'curator' }
      },
      {
        path: 'registrations',
        component: RegistrationsComponent,
        canActivate: [AuthGuard],
        data: { role: 'seller' }
      },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  // Любые другие маршруты (404?)
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
