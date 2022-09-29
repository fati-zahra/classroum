import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuiz, Quiz } from '../quiz.model';
import { QuizService } from '../service/quiz.service';

@Injectable({ providedIn: 'root' })
export class QuizRoutingResolveService implements Resolve<IQuiz> {
  constructor(protected service: QuizService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuiz> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((quiz: HttpResponse<Quiz>) => {
          if (quiz.body) {
            return of(quiz.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Quiz());
  }
}
