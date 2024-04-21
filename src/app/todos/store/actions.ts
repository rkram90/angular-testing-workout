import { createAction, props } from '@ngrx/store';
import { TodoInterface, TodoList } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';


export const getTodos = createAction('[Todos] Get Todos');

export const getTodosSuccess = createAction(
  '[Todos] Get Todos success',
  props<{ todos: TodoInterface[] }>()
)
export const getTodosFailure = createAction(
  '[Todos] Get Todos failure',
  props<{ error: string }>()
);


export const addTodos = createAction(
  '[Todos] Add Todos',
  props<{ title: string }>()
);

export const addTodosSuccess = createAction(
  '[Todos] Add Todos Success',
  props<{ todos: TodoInterface }>()
);

export const addTodosFailure = createAction(
  '[Todos] Add Todos Failure',
  props<{ error: string }>()
);

export const updateFilter = createAction(
  '[Todos] update Todos filter',
  props<{ filter: FilterEnum }>()
);
