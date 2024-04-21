import { createFeature, createReducer, on } from "@ngrx/store";
import { TodoStateInterface } from "../types/todo.interface";
import * as TodosActions from './actions';
import { FilterEnum } from "../types/filter.enum";

export const todosInitialState: TodoStateInterface = {
    isLoaded: false,
    todos: [],
    error: false,
    filter: FilterEnum.all
  };


  const todosFeature = createFeature({
    name: 'todos',
    reducer: createReducer(
        todosInitialState,
        on(TodosActions.getTodosSuccess, (state,actions) => ({
            ...state,
            todos: actions.todos,
            isLoaded: true,
          })),
          on(TodosActions.addTodosSuccess, (state,actions) => ({
            ...state,
            todos: [...state.todos , {...actions.todos }],
            isLoaded: true,
          })),
          on(TodosActions.updateFilter, (state,actions) => ({
            ...state,
            filter: actions.filter
          }))
    ),
  });
  
  export const {
    name: todosFeatureKey,
    reducer: todosReducer,
    selectIsLoaded,
    selectError,
    selectTodos,
    selectFilter
  } = todosFeature;
  