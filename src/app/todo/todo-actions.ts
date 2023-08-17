export class AddItemAction {
  static readonly type = '[TODO page] add item';
  constructor(public name: string) {}
}
export class ToggleItemAction {
  static readonly type = '[TODO page] Toggle item';
  constructor(public id: number) {}
}
