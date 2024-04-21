import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { Store } from '@ngrx/store';
import { selectFilter, selectTodos } from '../../store/reducer';
import { Observable, filter, map, of, switchMap, combineLatest} from 'rxjs';
import * as TodosActions from '../../store/actions';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  todosService = inject(TodosService);
  store = inject(Store);
  todos$ = this.store.select(selectTodos);
  selectedFilter$ = this.store.select(selectFilter);

  filterSig$ = this.store.select(selectFilter);
  filterEnum = FilterEnum;

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

  
  activeCount$:Observable<number> = this.displayTodos$.pipe(
    switchMap(todo => of(todo.length))
  );


  noTodosClass$ = this.displayTodos$.pipe(
    map(array => array.length > 0 ? false : true)
  )


  itemsLeftText$ = this.activeCount$.pipe(
    map(count => `item${count !== 1 ? 's' : ''} left`)
  )

  changeFilter(filterName: FilterEnum): void {
    this.store.dispatch(TodosActions.updateFilter({filter: filterName}));
  }
}
