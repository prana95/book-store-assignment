import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscribable, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { BookService } from '../book-list/book.service';
import { Book } from '../book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  
  private searchTerms = new Subject()
  books$?: Observable<Book[]>

  constructor(private bookService:BookService){}

  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      tap(x=>x),
        debounceTime(30),
        distinctUntilChanged(),
        switchMap((term)=>this.bookService.searchBook(String(term))),
    )
  }

  gotoDetail(_t11: any) {
  throw new Error('Method not implemented.');
  }


  search(term: string) {
    this.searchTerms.next(term)
  }

}
