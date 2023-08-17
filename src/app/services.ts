import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from './todo/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  deleteTodo(id: number) {
    return this.http.delete('https://jsonplaceholder.typicode.com/todos/' + id);
  }

  addTodo(payload: string) {
    return this.http.post<TodoModel>(
      'https://jsonplaceholder.typicode.com/todos',
      payload
    );
  }
  // maybe change the payload to any
  updateTodo(id: number, payload: string) {
    return this.http.put<TodoModel>(
      'https://jsonplaceholder.typicode.com/todos/' + id,
      payload
    );
  }
}
