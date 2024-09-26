import { Component } from '@angular/core';
import { BookService } from './book.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {

  constructor(private bookService:BookService){}

  books$ = this.bookService.books$

}
