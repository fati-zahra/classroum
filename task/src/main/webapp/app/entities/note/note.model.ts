export interface INote {
  id?: number;
  title?: string | null;
  description?: string | null;
}

export class Note implements INote {
  constructor(public id?: number, public title?: string | null, public description?: string | null) {}
}

export function getNoteIdentifier(note: INote): number | undefined {
  return note.id;
}
