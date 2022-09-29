import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { QuizService } from '../service/quiz.service';
import { IQuiz, Quiz } from '../quiz.model';

import { QuizUpdateComponent } from './quiz-update.component';

describe('Quiz Management Update Component', () => {
  let comp: QuizUpdateComponent;
  let fixture: ComponentFixture<QuizUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quizService: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [QuizUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(QuizUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuizUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quizService = TestBed.inject(QuizService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quiz: IQuiz = { id: 456 };

      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(quiz));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Quiz>>();
      const quiz = { id: 123 };
      jest.spyOn(quizService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quiz }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(quizService.update).toHaveBeenCalledWith(quiz);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Quiz>>();
      const quiz = new Quiz();
      jest.spyOn(quizService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quiz }));
      saveSubject.complete();

      // THEN
      expect(quizService.create).toHaveBeenCalledWith(quiz);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Quiz>>();
      const quiz = { id: 123 };
      jest.spyOn(quizService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quiz });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quizService.update).toHaveBeenCalledWith(quiz);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
