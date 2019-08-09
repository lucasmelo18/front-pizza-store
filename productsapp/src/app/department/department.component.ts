import { Component, OnInit } from '@angular/core';
import { Department } from '../department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName: string = '';
  departments: Department[] = [
    {name: "teste", _id:"01"},
    {name: "teste", _id:"01"},
    {name: "teste", _id:"01"},
    {name: "teste", _id:"01"},
    {name: "teste", _id:"01"},
    {name: "teste", _id:"01"}
  ];
  constructor() { }

  ngOnInit() {
  }

}
