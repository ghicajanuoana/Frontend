import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-on-going-maintenance',
  templateUrl: './on-going-maintenance.component.html',
  styleUrls: ['./on-going-maintenance.component.css']
})
export class OnGoingMaintenanceComponent implements OnInit{
  todos: Todo[] = [];
  newTodo: Todo = {
    id: '',
    description: '',
    createdDate: new Date(),
    isCompleted: false,
    completedDate: new Date(),
    isDeleted: false,
    deletedDate: new Date()
  };

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe({
      next: (todos) => {
        this.todos = todos;
      }
    });
  }

  addTodo(){
    this.todoService.addTodo(this.newTodo)
    .subscribe({
    next: (todo) => {
      this.getAllTodos();
    }
    });
  }

  onCompletedChange(id: string, todo: Todo){
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(id, todo)
      .subscribe({
        next: (response) => {
          this.getAllTodos();
        }
      });
  }

  deleteTodo(id: string){
    this.todoService.deleteTodo(id)
        .subscribe({
          next: (response) => {
            this.getAllTodos();
          }
        })
  }


}
