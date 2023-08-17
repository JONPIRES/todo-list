import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoModel } from '../todo/todo';
import {
  AddItemAction,
  DeleteItemAction,
  EditOnAction,
  ToggleItemAction,
  EditItemAction,
} from '../todo/todo-actions';
import { TodoSelectors } from '../todo/todo-selectors';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Select(TodoSelectors.todoItems) todoItems$!: Observable<TodoModel[]>;

  newItemName!: string;
  editName!: string;
  constructor(private store: Store) {}

  trackById(idx: number, item: TodoModel): number {
    return item.id;
  }

  toggleItem(todoItem: TodoModel) {
    this.store.dispatch(new ToggleItemAction(todoItem.id));
  }

  addItem() {
    this.store.dispatch(new AddItemAction(this.newItemName));

    this.newItemName = '';
  }

  deleteItem(todoItem: TodoModel) {
    this.store.dispatch(new DeleteItemAction(todoItem.id));
  }

  toggleEdit(todoItem: TodoModel) {
    this.store.dispatch(new EditOnAction(todoItem.id));
  }
  editItem(todoItem: TodoModel) {
    this.store.dispatch(new EditItemAction(todoItem.id, this.editName));
    this.store.dispatch(new EditOnAction(todoItem.id));
  }
}
