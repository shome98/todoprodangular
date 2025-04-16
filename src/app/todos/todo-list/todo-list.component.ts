import { Component,} from '@angular/core';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent{
  todos$: Observable<Todo[]>;
  constructor(private todoService: TodoService, private router: Router) {
    this.todos$ = this.todoService.getAllTodos(); 
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe();
  }

  viewTodo(id: number): void {
    this.router.navigate(['/todos', id]);
  }

  editTodo(id: number): void {
    this.router.navigate(['/todos/edit', id]);
  }
}
