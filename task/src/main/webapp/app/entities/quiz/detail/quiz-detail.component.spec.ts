import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QuizDetailComponent } from './quiz-detail.component';

describe('Quiz Management Detail Component', () => {
  let comp: QuizDetailComponent;
  let fixture: ComponentFixture<QuizDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ quiz: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(QuizDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(QuizDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quiz on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.quiz).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
