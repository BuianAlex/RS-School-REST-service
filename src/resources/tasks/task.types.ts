type IBaseTask = Record<string, unknown>;
export interface ITask extends IBaseTask {
  id: string;
  title: string;
  boardId: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string;
}
