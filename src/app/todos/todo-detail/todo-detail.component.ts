import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  standalone: false,
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTodo(id);
  }
  
  getTodo(id: number) {
    this.todoService.getTodoById(id).subscribe((todo) => this.todo = todo);
  }

  goBack(): void{
    this.location.back();
  }
}
