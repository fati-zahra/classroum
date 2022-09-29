import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuizComponent } from './list/quiz.component';
import { QuizDetailComponent } from './detail/quiz-detail.component';
import { QuizUpdateComponent } from './update/quiz-update.component';
import { QuizDeleteDialogComponent } from './delete/quiz-delete-dialog.component';
import { QuizRoutingModule } from './route/quiz-routing.module';

@NgModule({
  imports: [SharedModule, QuizRoutingModule],
  declarations: [QuizComponent, QuizDetailComponent, QuizUpdateComponent, QuizDeleteDialogComponent],
  entryComponents: [QuizDeleteDialogComponent],
})
export class QuizModule {}
