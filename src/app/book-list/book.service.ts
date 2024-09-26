import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../book';
import { Observable, catchError, filter, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = 'https://potterapi-fedeperin.vercel.app/en/books'

  constructor(private http:HttpClient) { }

  books$ = this.http.get<Book[]>(this.bookUrl).pipe(
    tap(x=>x)
  )

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
