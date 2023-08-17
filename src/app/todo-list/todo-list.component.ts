import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoModel } from '../todo/todo';
import {
  AddItemAction,
  DeleteItemAction,
  ToggleItemAction,
} from '../todo/todo-actions';
import { TodoSelectors } from '../todo/todo-selectors';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Select(TodoSelectors.todoItems) todoItems$!: Observable<TodoModel[]>;

  editOn = false;
  newItemName!: string;
  items: TodoModel[] = [
    ...new Array(10).map((_, index) => ({
      id: index + 1,
      isDone: false,
      title: `Todo ${index + 1}`,
    })),
  ];
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
}
