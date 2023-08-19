import { TodoModel } from './todo';

export class AddItemAction {
  static readonly type = '[TODO page] add item';
  constructor(public name: string) {}
}
export class ToggleItemAction {
  static readonly type = '[TODO page] Toggle item';
  constructor(public id: number) {}
}

export class EditOnAction {
  static readonly type = '[TODO page] EditOn item';
  constructor(public id: number) {}
}

export class DeleteItemAction {
  static readonly type = '[TODO page] Delete item';
  constructor(public id: number) {}
}
export class EditItemAction {
  static readonly type = '[TODO page] Edit item';
  constructor(public id: number, public name: string) {}
}
export class UpdateTodoItemsAction {
  static readonly type = '[TODO page] update order';
  constructor(
    public old: number,
    public current: number,
    public itemId: number
  ) {}
}
