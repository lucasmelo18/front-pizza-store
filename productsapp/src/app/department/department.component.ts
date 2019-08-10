import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [
    {name: "miguel", _id:"01"},
    {name: "lucas", _id:"02"},
    {name: "nati", _id:"03"},
  ];
  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.get()
      .subscribe((deps) => this.departments = deps);
  }
  
  save(){
    this.departmentService.add({name: this.depName})
      .subscribe(
        (dep) =>{
          console.log(dep);
          this.clearFields(); 
        },
        (err) => console.error(err)
      )
  }

  clearFields(){
    this.depName = "";
  }
}
