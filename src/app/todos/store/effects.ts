import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodosActions from './actions';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodosService } from '../services/todos.service';
import { TodoInterface } from '../types/todo.interface';

@Injectable()
export class TodosEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.getTodos),
      mergeMap(() => {
        return this.todosService.getTodoList().pipe(
          map((todos) => {
            console.log(todos)
            return TodosActions.getTodosSuccess({ todos })
          }),
          catchError((error) =>
            of(TodosActions.getTodosFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodos),
      switchMap(({title}) => {
        return this.todosService.addTodo(title).pipe(
          map((todos) => {
            console.log(todos)
            const newTodo: TodoInterface = {
              id: '123',
              text: title,
              isCompleted: false,
            };
            return TodosActions.addTodosSuccess({todos:newTodo});
          }),
          catchError((error) =>
            of(TodosActions.addTodosFailure({ error: error.message }))
          )
        );
      })
    )
  );



  constructor(private actions$: Actions, private todosService: TodosService) {}
}
