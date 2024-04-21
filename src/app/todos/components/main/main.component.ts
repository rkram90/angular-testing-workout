import { Component, OnInit, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';
import { tap, map, combineLatest} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectFilter, selectTodos } from '../../store/reducer';
import * as TodosActions from '../../store/actions';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [CommonModule, TodoComponent],
})
export class MainComponent implements OnInit {
  todosService = inject(TodosService);
  store = inject(Store);
  
  editingId: string | null = null;

  selectedFilter$ = this.store.select(selectFilter);
  

  todos$ =  this.store.pipe(
    select(selectTodos),
    tap(t => {
      console.log(t);
    })
  );

  noTodosClass$ = this.todos$.pipe(
    map(array => array.length > 0 ? false : true)
  )

  displayTodos$ = combineLatest([this.todos$,this.selectedFilter$]).pipe(
    map(([todos,filter]) =>  {
      if (filter === FilterEnum.active) {
        return todos.filter((todo) => !todo.isCompleted);
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted);
      }
      return todos;
    } )
  );

  ngOnInit(): void {
    this.store.dispatch(TodosActions.getTodos());
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('make all checked');
    //this.todosService.toggleAll(target.checked);
  }
}
