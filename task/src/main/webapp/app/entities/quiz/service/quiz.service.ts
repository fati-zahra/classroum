import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuiz, getQuizIdentifier } from '../quiz.model';

export type EntityResponseType = HttpResponse<IQuiz>;
export type EntityArrayResponseType = HttpResponse<IQuiz[]>;

@Injectable({ providedIn: 'root' })
export class QuizService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quizzes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(quiz: IQuiz): Observable<EntityResponseType> {
    return this.http.post<IQuiz>(this.resourceUrl, quiz, { observe: 'response' });
  }

  update(quiz: IQuiz): Observable<EntityResponseType> {
    return this.http.put<IQuiz>(`${this.resourceUrl}/${getQuizIdentifier(quiz) as number}`, quiz, { observe: 'response' });
  }

  partialUpdate(quiz: IQuiz): Observable<EntityResponseType> {
    return this.http.patch<IQuiz>(`${this.resourceUrl}/${getQuizIdentifier(quiz) as number}`, quiz, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuiz>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuiz[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addQuizToCollectionIfMissing(quizCollection: IQuiz[], ...quizzesToCheck: (IQuiz | null | undefined)[]): IQuiz[] {
    const quizzes: IQuiz[] = quizzesToCheck.filter(isPresent);
    if (quizzes.length > 0) {
      const quizCollectionIdentifiers = quizCollection.map(quizItem => getQuizIdentifier(quizItem)!);
      const quizzesToAdd = quizzes.filter(quizItem => {
        const quizIdentifier = getQuizIdentifier(quizItem);
        if (quizIdentifier == null || quizCollectionIdentifiers.includes(quizIdentifier)) {
          return false;
        }
        quizCollectionIdentifiers.push(quizIdentifier);
        return true;
      });
      return [...quizzesToAdd, ...quizCollection];
    }
    return quizCollection;
  }
}
