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
  display = false;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.display = true;
    return this.appService.getEmployee().subscribe((data: Employee[]) => {
      this.employeeLists = data;
      this.display = false;
    });
  }

  ngOnDestroy() {
  }


  editThisEmployee(x: any) {
    this.router.navigate(['/view',x.id]);
  }

  deleteEmployee(delId: number) {
    this.appService.deleteEmployeePerm(delId);
  }



}
