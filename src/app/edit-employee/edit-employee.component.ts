import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
// import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.module';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.sass']
})
export class EditEmployeeComponent implements OnInit {
  employeeEditLists = [];
  subscription: Subscription;

  constructor(private appService: AppService, private router: Router) {
  }

  ngOnInit() {
    this.appService.editEmployee$.subscribe((d) => {
      this.employeeEditLists = d;
      console.log(d);
    });


  }

  saveEmployee(x: any) {
    this.appService.editEmployee(this.employeeEditLists[0]).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/']);
    },
    (error) => console.log(error));
  }

  backToHome() {
    alert('No new data to save!');
    this.router.navigate(['/']);
  }

}


