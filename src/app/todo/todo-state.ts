import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { TodoModel } from './todo';
import { AddItemAction, ToggleItemAction } from './todo-actions';

export interface TodoStateModel {
  items: TodoModel[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: [],
  },
})
@Injectable()
export class TodoState {
  @Action(AddItemAction)
  addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
    const { name } = action;

    if (!name) {
      return;
    }
    const state = ctx.getState();

    const todoItem: TodoModel = {
      id: Math.floor(Math.random() * 1000),
      isDone: false,
      title: name,
    };
    ctx.setState({
      ...state,
      items: [...state.items, todoItem],
    });
    console.log(ctx.getState());
  }

  @Action(ToggleItemAction)
  toggleItem() {}
}
