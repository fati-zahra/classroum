export interface IQuiz {
  id?: number;
  title?: string | null;
  description?: string | null;
}

export class Quiz implements IQuiz {
  constructor(public id?: number, public title?: string | null, public description?: string | null) {}
}

export function getQuizIdentifier(quiz: IQuiz): number | undefined {
  return quiz.id;
}
