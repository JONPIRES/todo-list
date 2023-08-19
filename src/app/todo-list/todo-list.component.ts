import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { TodoModel } from '../todo/todo';
import {
  AddItemAction,
  DeleteItemAction,
  EditOnAction,
  ToggleItemAction,
  EditItemAction,
  UpdateTodoItemsAction,
} from '../todo/todo-actions';
import { TodoSelectors } from '../todo/todo-selectors';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Select(TodoSelectors.todoItems)
  todoItems$!: Observable<TodoModel[]>;

  newItemName!: string;
  editName!: string;
  constructor(private store: Store) {}

  private destroy$ = new Subject<void>();

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
    this.editName = '';
  }
  editItem(todoItem: TodoModel) {
    this.store.dispatch(new EditItemAction(todoItem.id, this.editName));
    this.store.dispatch(new EditOnAction(todoItem.id));
    this.editName = '';
  }
  drop(event: CdkDragDrop<TodoModel>) {
    const oldIdx = event.previousIndex;
    const newIdx = event.currentIndex;
    const itemId = event.item.element.nativeElement.getAttribute('id');
    this.store.dispatch(
      new UpdateTodoItemsAction(oldIdx, newIdx, parseInt(itemId))
    );
  }
}
