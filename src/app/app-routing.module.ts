import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,title:'home page'},
  {path:'book-list',component:BookListComponent,title:'book list'},
  {path:'book-detail/:id',component:BookDetailComponent,title:'book detail'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
