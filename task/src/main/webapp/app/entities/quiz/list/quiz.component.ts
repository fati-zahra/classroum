import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuiz } from '../quiz.model';
import { QuizService } from '../service/quiz.service';
import { QuizDeleteDialogComponent } from '../delete/quiz-delete-dialog.component';

@Component({
  styleUrls: ['./../../cours.css'],
  selector: 'jhi-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit {
  quizzes?: IQuiz[];
  isLoading = false;

  constructor(protected quizService: QuizService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.quizService.query().subscribe({
      next: (res: HttpResponse<IQuiz[]>) => {
        this.isLoading = false;
        this.quizzes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IQuiz): number {
    return item.id!;
  }

  delete(quiz: IQuiz): void {
    const modalRef = this.modalService.open(QuizDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.quiz = quiz;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
