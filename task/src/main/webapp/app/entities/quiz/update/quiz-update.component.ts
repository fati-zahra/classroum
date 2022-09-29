import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IQuiz, Quiz } from '../quiz.model';
import { QuizService } from '../service/quiz.service';

@Component({
  styleUrls: ['./../../cours.css'],
  selector: 'jhi-quiz-update',
  templateUrl: './quiz-update.component.html',
})
export class QuizUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
  });

  constructor(protected quizService: QuizService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quiz }) => {
      this.updateForm(quiz);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quiz = this.createFromForm();
    if (quiz.id !== undefined) {
      this.subscribeToSaveResponse(this.quizService.update(quiz));
    } else {
      this.subscribeToSaveResponse(this.quizService.create(quiz));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuiz>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(quiz: IQuiz): void {
    this.editForm.patchValue({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
    });
  }

  protected createFromForm(): IQuiz {
    return {
      ...new Quiz(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
