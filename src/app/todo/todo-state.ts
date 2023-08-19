import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { TodoModel } from './todo';
import {
  AddItemAction,
  ToggleItemAction,
  DeleteItemAction,
  EditItemAction,
  EditOnAction,
  UpdateTodoItemsAction,
} from './todo-actions';
import { TodoService } from '../services';
import { tap } from 'rxjs/operators';
import { updateItem } from '@ngxs/store/operators';

export interface TodoStateModel {
  items: TodoModel[];
}
let lastId: number = 1;

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: [],
  },
})
@Injectable()
export class TodoState {
  constructor(private todoService: TodoService) {}
  @Action(AddItemAction)
  addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
    return this.todoService.addTodo(action.name).pipe(
      tap((result) => {
        const { name } = action;

        if (!name) {
          return;
        }
        const state = ctx.getState();

        const todoItem: TodoModel = {
          id: lastId,
          isDone: false,
          editOn: false,
          title: name,
        };
        ctx.setState({
          ...state,
          items: [...state.items, todoItem],
        });
        lastId += 1;
        console.log(ctx.getState());
      })
    );
  }

  @Action(ToggleItemAction)
  toggleItem(ctx: StateContext<TodoStateModel>, action: ToggleItemAction) {
    const state = ctx.getState();

    const newTodoItems = state.items.map((item) => {
      if (item.id === action.id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      }
      return item;
    });
    ctx.setState({
      items: [...newTodoItems],
    });
  }
  @Action(EditOnAction)
  editOn(ctx: StateContext<TodoStateModel>, action: EditOnAction) {
    const state = ctx.getState();

    const newTodoItems = state.items.map((item) => {
      if (item.id === action.id) {
        return {
          ...item,
          editOn: !item.editOn,
        };
      }
      return item;
    });
    ctx.setState({
      items: [...newTodoItems],
    });
  }

  @Action(DeleteItemAction)
  deleteItem(ctx: StateContext<TodoStateModel>, action: DeleteItemAction) {
    return this.todoService.deleteTodo(action.id).pipe(
      tap(() => {
        const state = ctx.getState();

        const newTodoItems = state.items.filter(
          (item) => item.id !== action.id
        );

        ctx.setState({
          items: [...newTodoItems],
        });
      })
    );
  }

  @Action(EditItemAction)
  editItem(ctx: StateContext<TodoStateModel>, payload: EditItemAction) {
    const { id, name } = payload;
    return this.todoService.updateTodo(id, name).pipe(
      tap((result) => {
        if (!name) {
          return;
        }
        const state = ctx.getState();
        const newTodoItems = state.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              title: name,
            };
          }
          return item;
        });
        ctx.setState({
          items: [...newTodoItems],
        });
      })
    );
  }

  @Action(UpdateTodoItemsAction)
  updateOrder(
    ctx: StateContext<TodoStateModel>,
    action: UpdateTodoItemsAction
  ) {
    const { old, current, itemId } = action;

    return this.todoService.updateIndex(itemId, action).pipe(
      tap((result) => {
        const state = ctx.getState();
        let updatedItems = [...state.items];
        const [movedItem] = updatedItems.splice(old, 1);
        updatedItems.splice(current, 0, movedItem);

        ctx.setState({
          ...state,
          items: updatedItems,
        });
      })
    );
  }
}
