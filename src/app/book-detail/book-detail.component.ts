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
bookToDisplay$ = this.bookService.book$.pipe(
  filter(Boolean),
  catchError(err=>{
    this.errorMessage = err;
    return EMPTY
  })
);
lengthBook = 8 //this line should the length of books
elementHide =false


constructor(private route:ActivatedRoute,private router : Router,private bookService:BookService){}


ngOnInit(): void {
  
  this.route.queryParams.subscribe(params=>{
    console.log('params = '+ params['id'])
    this.bookService.bookSelected(+params['id']) // so if i use queryParams or parmamap the param got by the angular is string so i need to change it to number type
    if(this.lengthBook<=parseInt(params['id']) ){
      this.elementHide = true
      console.log('if block');
      
    }
    else{
      this.elementHide = false
      console.log('else block');

    }
    //this.bookService.book$.subscribe(book=>this.bookToDisplay=book)
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
