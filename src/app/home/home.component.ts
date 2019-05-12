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
  employeeEditLists = [];
  addressInput = false;
  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    return this.appService.getEmployee().subscribe((data: Employee[]) => {
      this.employeeLists = data;
    });
  }

  ngOnDestroy() {
  }


  editEmployee(x): void {
    this.employeeEditLists = [];
    this.addressInput = true;
    this.employeeEditLists.push(x);
  }

  deleteEmployee(delId: number) {
    this.appService.deleteEmployeePerm(delId);
  }

  saveEmployee(x) {
    // console.log(x.value);
    this.appService.editEmployee(x.value).subscribe((data)=> {
      // console.log(data);
      location.reload();
    },
    (error) => console.log(error));
  }

  returnToHome() {
    alert('No new data to save!');
    this.router.navigate(['/']);
  }

}
