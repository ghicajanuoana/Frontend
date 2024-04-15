import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { ConfigService } from "./configuration.service"
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string = "https://localhost:7137/api/";

  constructor(protected http: HttpClient, private config: ConfigService) { }

  getAllTodos(): Observable <Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl + 'Todo');
  }

  addTodo(newTodo: Todo): Observable<Todo>{
    newTodo.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Todo>(this.apiUrl + 'Todo', newTodo);
  }

  updateTodo(id: string, todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(this.apiUrl + 'Todo/' + id, todo);
  }

  deleteTodo(id: string): Observable<Todo>{
    return this.http.delete<Todo>(this.apiUrl + 'Todo/' + id);
  }

  getAllDeletedTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiUrl + 'Todo/get-deleted-todos');
  }

  undoDeleteTodo(id: string, todo: Todo): Observable<Todo>{
    return this.http.put<Todo>(this.apiUrl + 'Todo/undo-deleted-todo/' + id, todo);
  }
}
