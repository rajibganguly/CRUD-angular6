import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
// import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  employeeLists = [];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    return this.appService.getEmployee().subscribe((data: Employee[]) => {
      this.employeeLists = data;
    });
  }

  ngOnDestroy() {
  }


  editThisEmployee(x: any) {
    this.appService.editExistingEmpArray(x);
    this.router.navigate(['/edit']);
  }

  deleteEmployee(delId: number) {
    this.appService.deleteEmployeePerm(delId);
  }



}
