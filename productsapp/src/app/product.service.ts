import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/sabores';
  private productsSubjects: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]>{
    if(!this.loaded){
      this.http.get<Product[]>(this.url)
        .subscribe(this.productsSubjects);
      this.loaded = true;
    }
    
    return this.productsSubjects.asObservable();

  }
}
