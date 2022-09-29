import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CourseService } from '../service/course.service';
import { ICourse, Course } from '../course.model';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { TeacherService } from 'app/entities/teacher/service/teacher.service';
import { INote } from 'app/entities/note/note.model';
import { NoteService } from 'app/entities/note/service/note.service';
import { IResume } from 'app/entities/resume/resume.model';
import { ResumeService } from 'app/entities/resume/service/resume.service';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizService } from 'app/entities/quiz/service/quiz.service';

import { CourseUpdateComponent } from './course-update.component';

describe('Course Management Update Component', () => {
  let comp: CourseUpdateComponent;
  let fixture: ComponentFixture<CourseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let courseService: CourseService;
  let teacherService: TeacherService;
  let noteService: NoteService;
  let resumeService: ResumeService;
  let quizService: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CourseUpdateComponent],
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
      .overrideTemplate(CourseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CourseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    courseService = TestBed.inject(CourseService);
    teacherService = TestBed.inject(TeacherService);
    noteService = TestBed.inject(NoteService);
    resumeService = TestBed.inject(ResumeService);
    quizService = TestBed.inject(QuizService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call teacher query and add missing value', () => {
      const course: ICourse = { id: 456 };
      const teacher: ITeacher = { id: 21789 };
      course.teacher = teacher;

      const teacherCollection: ITeacher[] = [{ id: 43077 }];
      jest.spyOn(teacherService, 'query').mockReturnValue(of(new HttpResponse({ body: teacherCollection })));
      const expectedCollection: ITeacher[] = [teacher, ...teacherCollection];
      jest.spyOn(teacherService, 'addTeacherToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(teacherService.query).toHaveBeenCalled();
      expect(teacherService.addTeacherToCollectionIfMissing).toHaveBeenCalledWith(teacherCollection, teacher);
      expect(comp.teachersCollection).toEqual(expectedCollection);
    });

    it('Should call note query and add missing value', () => {
      const course: ICourse = { id: 456 };
      const note: INote = { id: 44050 };
      course.note = note;

      const noteCollection: INote[] = [{ id: 25908 }];
      jest.spyOn(noteService, 'query').mockReturnValue(of(new HttpResponse({ body: noteCollection })));
      const expectedCollection: INote[] = [note, ...noteCollection];
      jest.spyOn(noteService, 'addNoteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(noteService.query).toHaveBeenCalled();
      expect(noteService.addNoteToCollectionIfMissing).toHaveBeenCalledWith(noteCollection, note);
      expect(comp.notesCollection).toEqual(expectedCollection);
    });

    it('Should call resume query and add missing value', () => {
      const course: ICourse = { id: 456 };
      const resume: IResume = { id: 30931 };
      course.resume = resume;

      const resumeCollection: IResume[] = [{ id: 33988 }];
      jest.spyOn(resumeService, 'query').mockReturnValue(of(new HttpResponse({ body: resumeCollection })));
      const expectedCollection: IResume[] = [resume, ...resumeCollection];
      jest.spyOn(resumeService, 'addResumeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(resumeService.query).toHaveBeenCalled();
      expect(resumeService.addResumeToCollectionIfMissing).toHaveBeenCalledWith(resumeCollection, resume);
      expect(comp.resumesCollection).toEqual(expectedCollection);
    });

    it('Should call quiz query and add missing value', () => {
      const course: ICourse = { id: 456 };
      const quiz: IQuiz = { id: 36728 };
      course.quiz = quiz;

      const quizCollection: IQuiz[] = [{ id: 31891 }];
      jest.spyOn(quizService, 'query').mockReturnValue(of(new HttpResponse({ body: quizCollection })));
      const expectedCollection: IQuiz[] = [quiz, ...quizCollection];
      jest.spyOn(quizService, 'addQuizToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(quizService.query).toHaveBeenCalled();
      expect(quizService.addQuizToCollectionIfMissing).toHaveBeenCalledWith(quizCollection, quiz);
      expect(comp.quizzesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const course: ICourse = { id: 456 };
      const teacher: ITeacher = { id: 4296 };
      course.teacher = teacher;
      const note: INote = { id: 42691 };
      course.note = note;
      const resume: IResume = { id: 81117 };
      course.resume = resume;
      const quiz: IQuiz = { id: 32200 };
      course.quiz = quiz;

      activatedRoute.data = of({ course });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(course));
      expect(comp.teachersCollection).toContain(teacher);
      expect(comp.notesCollection).toContain(note);
      expect(comp.resumesCollection).toContain(resume);
      expect(comp.quizzesCollection).toContain(quiz);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Course>>();
      const course = { id: 123 };
      jest.spyOn(courseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: course }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(courseService.update).toHaveBeenCalledWith(course);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Course>>();
      const course = new Course();
      jest.spyOn(courseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: course }));
      saveSubject.complete();

      // THEN
      expect(courseService.create).toHaveBeenCalledWith(course);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Course>>();
      const course = { id: 123 };
      jest.spyOn(courseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ course });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(courseService.update).toHaveBeenCalledWith(course);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackTeacherById', () => {
      it('Should return tracked Teacher primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackTeacherById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackNoteById', () => {
      it('Should return tracked Note primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackNoteById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackResumeById', () => {
      it('Should return tracked Resume primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackResumeById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackQuizById', () => {
      it('Should return tracked Quiz primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackQuizById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
