import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../app.service';
import { Employee, Location } from '../employee/employee.module';

import { FormGroup, Validator, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.sass']
})
export class NewEmployeeComponent implements OnInit {
  private heroForm: any[];
  private holdingValueEmployee: any[] = [];
  createEmployeeDetails: FormGroup;
  // learn from  https://www.youtube.com/watch?v=qNsFvwlzhDs

  constructor(private router: Router, private appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createEmployeeDetails = this.fb.group({
      name: [''],
      address: [''],
      category: [''],
      skills: [''],
      imagepath: [''],
      doj: [''],
      locations: this.fb.array([
        this.addlocationFormGroup()
      ])
    })
  }

  addlocationFormGroup(): FormGroup {
    return this.fb.group({
      enddate: [''],
      lacation: [''],
      project: [''],
      projectcode: [''],
      startdate: ['']
    })
  }

  

  saveNewEmployee(empFd: Employee[]): void {
    const emp = empFd['value'];
    console.log(emp);
    // this.holdingValueEmployee = [];
    // this.holdingValueEmployee.push(emp);
    this.appService.saveEmployee(emp);
    this.router.navigate(['/']);
  }

  returnToHome() {
    alert('No new employee added!');
    this.router.navigate(['/']);
  }

}
