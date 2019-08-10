import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: String = '';
  departments: Department[] = [];
  depEdit: Department = null;

  constructor(private departmentService: DepartmentService, 
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departmentService.get()
      .subscribe((deps) => this.departments = deps);
  }
  
  save(){
    if(this.depEdit){
      this.departmentService.update({name: this.depName, _id: this.depEdit._id})
        .subscribe((dep) =>{
          this.notify('Atualizado');
        },
        (err) => {
          this.notify('Erro ao atualizar');
          console.error(err);
        });
    }
    else{
      this.departmentService.add({name: this.depName})
        .subscribe(
          (dep) =>{
            console.log(dep);
            this.clearFields(); 
            this.notify('Inserido com sucesso');

          },
          (err) => console.error(err)
        )

    }
  }

  clearFields(){
    this.depName = "";
    this.depEdit = null;
  }

  edit(dep: Department){
    this.depName = dep.name;
    this.depEdit = dep;
  }

  notify(msg: string){
    this.snackBar.open(msg,'Ok', {duration: 3000})
  }
}
