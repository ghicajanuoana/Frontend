import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-deleted-todo',
  templateUrl: './deleted-todo.component.html',
  styleUrls: ['./deleted-todo.component.css']
})
export class DeletedTodoComponent implements OnInit{
  todos: Todo[] = [];

  constructor(private toDoService: TodoService){}

  ngOnInit(): void {
    this.getAllDeletedTodos();
  }

  getAllDeletedTodos(){
    this.toDoService.getAllDeletedTodos()
        .subscribe({
          next: (res) => {
            this.todos = res;
          }
        });
  }

  undoDeleteTodo(id: string, todo: Todo){
    this.toDoService.undoDeleteTodo(id, todo)
        .subscribe({
          next: (res) => {
            this.getAllDeletedTodos();
          }
        });
  }
}
