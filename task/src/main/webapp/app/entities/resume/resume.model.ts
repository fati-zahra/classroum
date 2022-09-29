export interface IResume {
  id?: number;
  title?: string | null;
  description?: string | null;
}

export class Resume implements IResume {
  constructor(public id?: number, public title?: string | null, public description?: string | null) {}
}

export function getResumeIdentifier(resume: IResume): number | undefined {
  return resume.id;
}
