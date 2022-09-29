import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'course',
        data: { pageTitle: 'tasksApp.course.home.title' },
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
      },
      {
        path: 'teacher',
        data: { pageTitle: 'tasksApp.teacher.home.title' },
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule),
      },
      {
        path: 'note',
        data: { pageTitle: 'tasksApp.note.home.title' },
        loadChildren: () => import('./note/note.module').then(m => m.NoteModule),
      },
      {
        path: 'resume',
        data: { pageTitle: 'tasksApp.resume.home.title' },
        loadChildren: () => import('./resume/resume.module').then(m => m.ResumeModule),
      },
      {
        path: 'quiz',
        data: { pageTitle: 'tasksApp.quiz.home.title' },
        loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
