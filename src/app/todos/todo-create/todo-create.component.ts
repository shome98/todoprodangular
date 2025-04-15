import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  standalone: false,
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss'
})
export class TodoCreateComponent {
  todoForm: FormGroup;
  constructor(private fb: FormBuilder,private todoService:TodoService,private router:Router) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false],
    });
  }

  onSubmit(): void{
    if (this.todoForm.valid) {
      this.todoService.createTodo(this.todoForm.value).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    }
  }

  goBack(): void{
    this.router.navigate(['/todos']);
  }
}
