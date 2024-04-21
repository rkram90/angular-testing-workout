import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Store } from '@ngrx/store';
import * as TodosActions from '../../store/actions';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  todosService = inject(TodosService);
  text: string = '';
  store = inject(Store)

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
   if(this.text)
    this.store.dispatch(TodosActions.addTodos({title: this.text}));
    this.text = '';
  }
}
