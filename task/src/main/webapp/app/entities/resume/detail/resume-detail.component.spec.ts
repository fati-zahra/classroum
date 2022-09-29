import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ResumeDetailComponent } from './resume-detail.component';

describe('Resume Management Detail Component', () => {
  let comp: ResumeDetailComponent;
  let fixture: ComponentFixture<ResumeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ resume: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ResumeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ResumeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load resume on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.resume).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
