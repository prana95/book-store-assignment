import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book-list/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, filter, tap } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit{


  

bookToDisplay?:Book ;
book$=new Subject()
bookSub$ = this.book$.asObservable()
identifiant!:number


constructor(private route:ActivatedRoute,private router : Router,private bookService:BookService){}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap != null ? this.route.snapshot.paramMap.get('id') : 0;
  this.identifiant = id!= null ? +id : 0;
  this.bookService.getSingleBook(this.identifiant).subscribe(book=>
      this.bookToDisplay = book
    )
  

  // const id = this.route.snapshot.paramMap != null ? this.route.snapshot.paramMap.get('id') : 0;
  // this.identifiant = id!= null ? +id : 0;
  // this.bookService.getSingleBook(this.identifiant).subscribe(pkm=>this.pokemonToDisplay=pkm);
  
}

deletePokemon(arg0: any) {
  throw new Error('Method not implemented.');
}

goBack() {
throw new Error('Method not implemented.');
}

editerBook(arg0: any) {
throw new Error('Method not implemented.');
}

}
