import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IQuiz, Quiz } from '../quiz.model';

import { QuizService } from './quiz.service';

describe('Quiz Service', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;
  let elemDefault: IQuiz;
  let expectedResult: IQuiz | IQuiz[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      title: 'AAAAAAA',
      description: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Quiz', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Quiz()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Quiz', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Quiz', () => {
      const patchObject = Object.assign(
        {
          description: 'BBBBBB',
        },
        new Quiz()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Quiz', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Quiz', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addQuizToCollectionIfMissing', () => {
      it('should add a Quiz to an empty array', () => {
        const quiz: IQuiz = { id: 123 };
        expectedResult = service.addQuizToCollectionIfMissing([], quiz);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quiz);
      });

      it('should not add a Quiz to an array that contains it', () => {
        const quiz: IQuiz = { id: 123 };
        const quizCollection: IQuiz[] = [
          {
            ...quiz,
          },
          { id: 456 },
        ];
        expectedResult = service.addQuizToCollectionIfMissing(quizCollection, quiz);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Quiz to an array that doesn't contain it", () => {
        const quiz: IQuiz = { id: 123 };
        const quizCollection: IQuiz[] = [{ id: 456 }];
        expectedResult = service.addQuizToCollectionIfMissing(quizCollection, quiz);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quiz);
      });

      it('should add only unique Quiz to an array', () => {
        const quizArray: IQuiz[] = [{ id: 123 }, { id: 456 }, { id: 28794 }];
        const quizCollection: IQuiz[] = [{ id: 123 }];
        expectedResult = service.addQuizToCollectionIfMissing(quizCollection, ...quizArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quiz: IQuiz = { id: 123 };
        const quiz2: IQuiz = { id: 456 };
        expectedResult = service.addQuizToCollectionIfMissing([], quiz, quiz2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quiz);
        expect(expectedResult).toContain(quiz2);
      });

      it('should accept null and undefined values', () => {
        const quiz: IQuiz = { id: 123 };
        expectedResult = service.addQuizToCollectionIfMissing([], null, quiz, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quiz);
      });

      it('should return initial array if no Quiz is added', () => {
        const quizCollection: IQuiz[] = [{ id: 123 }];
        expectedResult = service.addQuizToCollectionIfMissing(quizCollection, undefined, null);
        expect(expectedResult).toEqual(quizCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
