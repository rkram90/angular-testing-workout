import { Injectable, inject, signal } from '@angular/core';
import { TodoInterface, TodoList } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, throwError } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  httpClient = inject(HttpClient);
  apiBaseUrl = 'http://localhost:1880/rest/todos';

  appliedfilter: FilterEnum = FilterEnum.all;

  getTodoList(){
    return this.httpClient.get<TodoList>(this.apiBaseUrl).pipe(
      map(TodoList => TodoList.todos),
      catchError(this.handleError)
      );
  }

  addTodo(text: string) {
    const newTodo = {
      text,
      isCompleted: false,
    };
    return this.httpClient
      .post<TodoInterface>(this.apiBaseUrl, newTodo).pipe(
        catchError(this.handleError)
      )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
        }`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}
