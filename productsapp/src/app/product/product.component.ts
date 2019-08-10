import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../product';
import { DepartmentService } from '../department.service';
import { Department } from '../department';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['', [Validators.required]],
    stock: [0, [Validators.required, Validators.min(0)]],
    price: [0, [Validators.required, Validators.min(0)]],
    departments: [[], [Validators.required]],

  })

  products: Product[] = [];
  departments: Department[] = [];

  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private productsService: ProductService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productsService.get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((prods) => this.products = prods);
    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((deps) => this.departments = deps)
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

  save() {
    let data = this.productForm.value;
    if (data._id != null) {
      this.productsService.update(data)
        .subscribe()
    }
    else {
      this.productsService.add(data)
        .subscribe();
    }
    this.resetForm();
  }
  delete(p: Product) {
    this.productsService.del(p)
      .subscribe(
        () => {
          this.notify('Deletado com sucesso'),
          (err) => {
            console.error(err);
            this.notify('Erro ao deletar, tente novamente')
          }
        }
      )
  }

  edit(p: Product) {
    this.productForm.setValue(p);
  }

  notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 })
  }

  resetForm(){
    this.productForm.reset();
  }
}
