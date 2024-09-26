import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book-list/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Subject, Subscription, catchError, filter, tap } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit{


  

errorMessage =''
identifiant!:number
bookToDisplay?:Book ;


constructor(private route:ActivatedRoute,private router : Router,private bookService:BookService){}
// bookToDisplay$ = this.bookService.book$.pipe(
//   filter(Boolean),
//   catchError(err=>{
//     this.errorMessage = err;
//     return EMPTY
//   })
// )

ngOnInit(): void {
  this.bookService.book$.subscribe(book=>this.bookToDisplay=book)

  this.route.queryParams.subscribe(params=>{
    this.bookService.bookSelected(params['id'])
  })
//this.bookToDisplay$.subscribe(book=>this.bookToDisplay=book)
  
  // const id = this.route.snapshot.paramMap != null ? this.route.snapshot.paramMap.get('id') : 0;
  // this.identifiant = id!= null ? +id : 0;
  // this.bookService.getSingleBook(this.identifiant).subscribe(book=>
  //     this.bookToDisplay = book
  //   )
  
  
}

deleteBook(arg0: any) {
  throw new Error('Method not implemented.');
}

goBack() {
throw new Error('Method not implemented.');
}

editerBook(arg0: any) {
throw new Error('Method not implemented.');
}

}
