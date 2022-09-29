import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuiz } from '../quiz.model';
import { QuizService } from '../service/quiz.service';

@Component({

  templateUrl: './quiz-delete-dialog.component.html',
})
export class QuizDeleteDialogComponent {
  quiz?: IQuiz;

  constructor(protected quizService: QuizService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quizService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
