import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';


@NgModule({
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoCreateComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
