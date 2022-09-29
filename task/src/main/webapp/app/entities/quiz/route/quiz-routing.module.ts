import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { QuizComponent } from '../list/quiz.component';
import { QuizDetailComponent } from '../detail/quiz-detail.component';
import { QuizUpdateComponent } from '../update/quiz-update.component';
import { QuizRoutingResolveService } from './quiz-routing-resolve.service';

const quizRoute: Routes = [
  {
    path: '',
    component: QuizComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuizDetailComponent,
    resolve: {
      quiz: QuizRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuizUpdateComponent,
    resolve: {
      quiz: QuizRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuizUpdateComponent,
    resolve: {
      quiz: QuizRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quizRoute)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
