import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { NoteService } from '../service/note.service';

import { NoteComponent } from './note.component';

describe('Note Management Component', () => {
  let comp: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NoteComponent],
    })
      .overrideTemplate(NoteComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(NoteService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.notes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
