import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: String = '';
  departments: Department[] = [];
  private unsubscribes: Subject<any> = new Subject();
  depEdit: Department = null;

  constructor(
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departmentService.get() 
      .pipe( takeUntil(this.unsubscribes))
      .subscribe((deps) => this.departments = deps);
  }

  save() {
    if ( this.depEdit) {
      this.departmentService.update(
        {name: this.depName, _id: this.depEdit._id})
        .subscribe(
          (dep) => {
            this.notify('Atualizado com sucesso!');
          },
          (err) => {
            this.notify('Error ao atualizar, tente novamente');
            console.error(err);
          }
        )
    }
    else {
      this.departmentService.add({name: this.depName})
      .subscribe(
        (dep) => {
          console.log(dep);
          
          this.notify('Inserido com sucesso!');
        },
        (err) => console.error(err))
    }
    this.clearFields();
  }

  clearFields() {
    this.depName = '';
    this.depEdit = null;
  }

  cancel(){
    this.clearFields();
  }

  edit(dep: Department) {
    this.depName = dep.name;
    this.depEdit = dep;
  }

  delete(dep: Department) {
    this.departmentService.del(dep)
      .subscribe(
        () => this.notify('Funcionário removido com sucesso!'),
        (err) => this.notify(err.error.msg)
      )
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", {duration: 3000});
  }

  ngOnDestroy() {
    this.unsubscribes.next();
  }
}