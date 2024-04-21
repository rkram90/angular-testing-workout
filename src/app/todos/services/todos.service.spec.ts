import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FilterEnum } from '../types/filter.enum';
import { take } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('TodosService', () => {
  let todosService: TodosService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:1880/rest/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService],
    });
    todosService = TestBed.inject(TodosService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(todosService).toBeTruthy();
  });

  it('sets initial data', () => {
    expect(todosService.apiBaseUrl).toEqual(baseUrl);
    expect(todosService.appliedfilter).toEqual(FilterEnum.all);
  });

  describe('getTodos', () => {
    it('gets correct data', () => {
      let todoList: TodoInterface[] | undefined;
      todosService.getTodoList().subscribe(data =>{
        todoList = data;
      });
      const req = httpTestingController.expectOne(baseUrl);
      req.flush({  todos: [{ text: 'foo', isCompleted: true, id: '1' }] });
      expect(req.request.method).toEqual('GET');
      expect(todoList).toEqual([
        { text: 'foo', isCompleted: true, id: '1' },
      ])

    });

    it('throws an error if request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      const consoleLogSpy = jest.spyOn(console, 'error');

      todosService.getTodoList().subscribe({
        next: () =>{
          fail('Success should not be called');
        },
        error: (err) => {
          actualError = err;
        }
      });
      const req = httpTestingController.expectOne(baseUrl);
      req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
      expect(consoleLogSpy).toHaveBeenCalledWith("Server returned code: 404, error message is: Http failure response for http://localhost:1880/rest/todos: 404 Not Found");
    });

  });

  describe('addTodo', () => {
    it('creates a todo', () => {
      let todos: TodoInterface | undefined;
      todosService.addTodo('foo').pipe(take(1)).subscribe(data => {
        todos = data;
      })
      const req = httpTestingController.expectOne(baseUrl);
      req.flush({ text: 'foo', isCompleted: true, id: '1' });
      expect(req.request.method).toEqual('POST');
      expect(todos).toEqual(
        { text: 'foo', isCompleted: true, id: '1' },
      );
    });
  });



});
