import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { DepartmentService } from './department.service';
import { map, tap, filter } from 'rxjs/operators';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/sabores';
  private productsSubjects: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient,
    private departmentService: DepartmentService ) {

      this.get().subscribe((prods) => console.log(prods))
     }

  get(): Observable<Product[]> {
    if (!this.loaded) {
      combineLatest(
        this.http.get<Product[]>(this.url),
        this.departmentService.get())
      .pipe(
        map(([products,departments])=> {
          for(let p of products) {
            let ids = (p.departments as string[]);
            p.departments = ids.map((id)=>departments.find(dep=>dep._id==id));
          }
          return products;
        }),
        tap((products) => console.log(products))
      )
      .subscribe(this.productsSubjects);

      this.loaded = true;
    }
    return this.productsSubjects.asObservable();
  }

  add(prod: Product): Observable<Product>{
    let departments = (prod.departments as Department[]).map(d=>d._id);
    return this.http.post<Product>(this.url, {...prod, departments})
      .pipe(
        tap((p) =>{
          this.productsSubjects.getValue()
            .push({...prod, _id: p._id})
        })
      )

  }
  del(prod: Product): Observable<any>{
    return this.http.delete(`${this.url}/${prod._id}`)
              .pipe(
                tap(()=>{
                  let products = this.productsSubjects.getValue();
                  let indice = products.findIndex(p => p._id === prod._id);
                  if(indice>=0){
                    products.splice(indice,1);
                  }
                })
              )
  }

}