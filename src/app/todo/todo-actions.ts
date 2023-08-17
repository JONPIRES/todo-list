export class AddItemAction {
  static readonly type = '[TODO page] add item';
  constructor(public name: string) {}
}
export class ToggleItemAction {
  static readonly type = '[TODO page] Toggle item';
  constructor(public id: number) {}
}

// in construction
export class DeleteItemAction {
  static readonly type = '[TODO page] Delete item';
  constructor(public id: number) {}
}
export class EditItemAction {
  static readonly type = '[TODO page] Edit item';
  constructor(public id: number) {}
}
