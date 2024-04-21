import { FilterEnum } from "./filter.enum";

export interface TodoInterface {
  id: string;
  text: string;
  isCompleted: boolean;
}


export interface TodoList{
  todos:TodoInterface[]
}


export interface TodoStateInterface {
  isLoaded: boolean,
  todos: TodoInterface[],
  error: boolean,
  filter: FilterEnum
}