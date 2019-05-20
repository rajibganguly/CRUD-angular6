import { Component, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import { AppService } from '../app.service';
import { Employee, EmployeeHints } from './../employee/employee.module'

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<EmployeeHints[]>;
  states: EmployeeHints[] = [];

  constructor(
    private service: AppService
  ) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
    );

  }

  private _filterStates(value: string): EmployeeHints[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue);
    return this.states.filter(data => data.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    return this.service.getEmployee().subscribe((data: EmployeeHints[]) => {
      this.states = data;
    });
  }



}
