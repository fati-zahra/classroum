import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICourse, Course } from '../course.model';
import { CourseService } from '../service/course.service';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { INote } from 'app/entities/note/note.model';
import { NoteService } from 'app/entities/note/service/note.service';
import { IResume } from 'app/entities/resume/resume.model';
import { ResumeService } from 'app/entities/resume/service/resume.service';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';
import { Language } from 'app/entities/enumerations/language.model';

@Component({
  styleUrls: ['./../../cours.css'],
  selector: 'jhi-course-update',
  templateUrl: './course-update.component.html',
})
export class CourseUpdateComponent implements OnInit {
  isSaving = false;
  languageValues = Object.keys(Language);

  teachersCollection: ITeacher[] = [];
  notesCollection: INote[] = [];
  resumesCollection: IResume[] = [];
  quizzesCollection: IQuiz[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
    language: [],
    teacher: [],
    note: [],
    resume: [],
    quiz: [],
  });

  constructor(
    protected courseService: CourseService,
    protected teacherService: TeacherService,
    protected noteService: NoteService,
    protected resumeService: ResumeService,
    protected quizService: QuizService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (course.id !== undefined) {
      this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  trackTeacherById(_index: number, item: ITeacher): number {
    return item.id!;
  }

  trackNoteById(_index: number, item: INote): number {
    return item.id!;
  }

  trackResumeById(_index: number, item: IResume): number {
    return item.id!;
  }

  trackQuizById(_index: number, item: IQuiz): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
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

  protected updateForm(course: ICourse): void {
    this.editForm.patchValue({
      id: course.id,
      title: course.title,
      description: course.description,
      language: course.language,
      teacher: course.teacher,
      note: course.note,
      resume: course.resume,
      quiz: course.quiz,
    });

    this.teachersCollection = this.teacherService.addTeacherToCollectionIfMissing(this.teachersCollection, course.teacher);
    this.notesCollection = this.noteService.addNoteToCollectionIfMissing(this.notesCollection, course.note);
    this.resumesCollection = this.resumeService.addResumeToCollectionIfMissing(this.resumesCollection, course.resume);
    this.quizzesCollection = this.quizService.addQuizToCollectionIfMissing(this.quizzesCollection, course.quiz);
  }

  protected loadRelationshipsOptions(): void {
    this.teacherService
      .query({ filter: 'course-is-null' })
      .pipe(map((res: HttpResponse<ITeacher[]>) => res.body ?? []))
      .pipe(
        map((teachers: ITeacher[]) => this.teacherService.addTeacherToCollectionIfMissing(teachers, this.editForm.get('teacher')!.value))
      )
      .subscribe((teachers: ITeacher[]) => (this.teachersCollection = teachers));

    this.noteService
      .query({ filter: 'course-is-null' })
      .pipe(map((res: HttpResponse<INote[]>) => res.body ?? []))
      .pipe(map((notes: INote[]) => this.noteService.addNoteToCollectionIfMissing(notes, this.editForm.get('note')!.value)))
      .subscribe((notes: INote[]) => (this.notesCollection = notes));

    this.resumeService
      .query({ filter: 'course-is-null' })
      .pipe(map((res: HttpResponse<IResume[]>) => res.body ?? []))
      .pipe(map((resumes: IResume[]) => this.resumeService.addResumeToCollectionIfMissing(resumes, this.editForm.get('resume')!.value)))
      .subscribe((resumes: IResume[]) => (this.resumesCollection = resumes));

    this.quizService
      .query({ filter: 'course-is-null' })
      .pipe(map((res: HttpResponse<IQuiz[]>) => res.body ?? []))
      .pipe(map((quizzes: IQuiz[]) => this.quizService.addQuizToCollectionIfMissing(quizzes, this.editForm.get('quiz')!.value)))
      .subscribe((quizzes: IQuiz[]) => (this.quizzesCollection = quizzes));
  }

  protected createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      language: this.editForm.get(['language'])!.value,
      teacher: this.editForm.get(['teacher'])!.value,
      note: this.editForm.get(['note'])!.value,
      resume: this.editForm.get(['resume'])!.value,
      quiz: this.editForm.get(['quiz'])!.value,
    };
  }
}
