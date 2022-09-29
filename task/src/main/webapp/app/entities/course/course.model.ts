import { ITeacher } from 'app/entities/teacher/teacher.model';
import { INote } from 'app/entities/note/note.model';
import { IResume } from 'app/entities/resume/resume.model';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { Language } from 'app/entities/enumerations/language.model';

export interface ICourse {
  id?: number;
  title?: string | null;
  description?: string | null;
  language?: Language | null;
  teacher?: ITeacher | null;
  note?: INote | null;
  resume?: IResume | null;
  quiz?: IQuiz | null;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public title?: string | null,
    public description?: string | null,
    public language?: Language | null,
    public teacher?: ITeacher | null,
    public note?: INote | null,
    public resume?: IResume | null,
    public quiz?: IQuiz | null
  ) {}
}

export function getCourseIdentifier(course: ICourse): number | undefined {
  return course.id;
}
