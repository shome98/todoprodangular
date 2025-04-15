import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  standalone: false,
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss'
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup;
  todoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private todoService: TodoService,
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit():void {
    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.todoId) {
      this.loadTodo(this.todoId);
    }
  }

  loadTodo(id: number) {
    this.todoService.getTodoById(id).subscribe(todo => {
      this.todoForm.patchValue(todo);
    });
  }

  onSubmit(): void{
    if (this.todoForm.valid && this.todoId) {
      this.todoService.updateTodo(this.todoId, this.todoForm.value).subscribe(() => {
        this.router.navigate(['/todos']);
      });
    }
  }

  goBack(): void{
    this.location.back();
  }
}
