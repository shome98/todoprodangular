import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();
  constructor(private http: HttpClient) {
    this.loadInitialTodos();
   }

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  private loadInitialTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe((todos) => {
      this.todosSubject.next(todos);
    });
  }

  getAllTodos(): Observable<Todo[]> {
    return this.todos$; 
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap((newTodo) => {
        const currentTodos = this.todosSubject.getValue();
        this.todosSubject.next([...currentTodos, { ...newTodo, id: Date.now() }]);
      })
    );
  }

  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo).pipe(
      tap((updatedTodo) => {
        const currentTodos = this.todosSubject.getValue();
        const updatedTodos = currentTodos.map((t) => (t.id === id ? { ...t, ...updatedTodo } : t));
        this.todosSubject.next(updatedTodos);
      })
    );
  }

  deleteTodo(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTodos = this.todosSubject.getValue();
        const updatedTodos = currentTodos.filter((todo) => todo.id !== id);
        this.todosSubject.next(updatedTodos);
      })
    );
  }

}
