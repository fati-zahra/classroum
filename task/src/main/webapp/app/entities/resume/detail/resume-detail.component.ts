import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResume } from '../resume.model';

@Component({
  styleUrls: ['./../../cours.css'],
  selector: 'jhi-resume-detail',
  templateUrl: './resume-detail.component.html',
})
export class ResumeDetailComponent implements OnInit {
  resume: IResume | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resume }) => {
      this.resume = resume;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
