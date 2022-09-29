import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IResume, Resume } from '../resume.model';
import { ResumeService } from '../service/resume.service';

@Component({
  styleUrls: ['./../../cours.css'],
  selector: 'jhi-resume-update',
  templateUrl: './resume-update.component.html',
})
export class ResumeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
  });

  constructor(protected resumeService: ResumeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resume }) => {
      this.updateForm(resume);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resume = this.createFromForm();
    if (resume.id !== undefined) {
      this.subscribeToSaveResponse(this.resumeService.update(resume));
    } else {
      this.subscribeToSaveResponse(this.resumeService.create(resume));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResume>>): void {
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

  protected updateForm(resume: IResume): void {
    this.editForm.patchValue({
      id: resume.id,
      title: resume.title,
      description: resume.description,
    });
  }

  protected createFromForm(): IResume {
    return {
      ...new Resume(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
