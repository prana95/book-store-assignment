import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../book';
import { BehaviorSubject, Observable, catchError, filter, map, of, shareReplay, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = 'https://potterapi-fedeperin.vercel.app/en/books'
  private bookSelectedSubject = new BehaviorSubject<number|undefined>(undefined)
  readonly bookSelected$ = this.bookSelectedSubject.asObservable() 

  constructor(private http:HttpClient) { }

  books$ = this.http.get<Book[]>(this.bookUrl).pipe(
    tap(x=>x)
  )

  book$ = this.bookSelected$.pipe(
    filter(Boolean),
    switchMap(id=>{
      return this.http.get<Book[]>(this.bookUrl).pipe(
        tap(books => console.log('All books:', books)), // Log all books
        //tap(()=>console.log('identifiant =' +id)),
        map((books: Book[],id) => { // so find the problem i wasn't adding id to the param so it was considerning a string thats y i had the error when i was usinf === now it is ok
          console.log('identifiant =' +id );
          const singleBook = books.find((book,index) => {
            console.log(`Checking book: ${book}`,); // Log each book to verify property
            console.log(`typeof id : ${typeof(id)} and typeof book.index: ${typeof(book.index)}`); // seeing type for type conversion
            console.log(`id : ${id} and  book.index: ${book.index}`); // valueof id and book.index
            return book.index === id ; //  there was a probleme here if i try to do === undefined is returned but no i corrected the error it was on the first line of the map i didnt add id to the param
          });
          console.log('Found book:', singleBook); // Log the found book (if any)
          return singleBook;
        }),
        filter(Boolean),// adding this to exclude undefined
        tap(x=>console.log("inside service "+x.index))
        
      )
    })
  )

  // this.http.get<Book[]>(this.bookUrl).pipe(
  //   tap(books => console.log('All books:', books)), // Log all books
  //   map(books => {
  //     const singleBook = books.find(book => book.index === index); // Find book by index
  //     console.log('Found book by index:', singleBook); // Log the found book (if any)
  //     return singleBook;
  //   })
  // );


  getSingleBook(identifiant: number):Observable<Book> {
    return this.http.get<Book[]>(this.bookUrl).pipe(
      tap(()=>console.log('identifiant =' +identifiant)
      ),
      map((books: Book[]) => books.find((book, index) => book.index === identifiant)),
      filter(Boolean),// adding this to exclude undefined
      tap(x=>console.log("inside service "+x.index)
      )
      
    )
  }

  bookSelected(id:number):void{
    this.bookSelectedSubject.next(id)
  }

  private handleError<T>(operation= 'operation', result?: T) {
    // T: désigne le fait de typer un type en lui même
    // Renvoyer le bon type de la méthode qui a levé l'erreur.
    // operation: le nom de la méthode qui a causé l'erreur
    return (error: any): Observable<T> => {
     console.log(error);
     console.log(`${operation} failed: ${error.message}`);  
     
     // Of: Permet de transformer les données passées en paramètres en un observable tt simplement.
     return of ( result as T );
    };
  }

  searchBook(term:string):Observable<Book[]>{
    if(!term.trim()){
      console.log("dans le if");
      
      return of ([])
    }
    
    return this.http.get<Book[]>(`${this.bookUrl}/?search=${term}`).pipe(
      tap(()=>console.log(`found book matching "${term}"`)),
      catchError(this.handleError<Book[]>('searchBook',[]))
      );
  }

}
