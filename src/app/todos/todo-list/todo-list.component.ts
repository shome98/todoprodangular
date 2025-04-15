import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = [];
  constructor(private todoService: TodoService, private router: Router) { }
  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void{
    this.todoService.getAllTodos().subscribe(todos => this.todos = todos);
  }

  deleteTodo(id: number): void{
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  viewTodo(id: number): void{
    this.router.navigate(['/todos', id]);
  }

  editTodo(id: number): void{
    this.router.navigate(['/todos/edit', id]);
  }
}
