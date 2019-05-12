import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../app.service';
import { Employee } from '../employee/employee.module';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.sass']
})
export class NewEmployeeComponent implements OnInit {
  private heroForm: any[];
  private holdingValueEmployee: any[] = [];
  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }

  saveNewEmployee(empFd: any): void {
    const emp = empFd.value;
    const employee = {
      id: null,
      name: emp.name,
      category: emp.category,
      address: emp.address,
      skills: [emp.skills],
      profilepicpath: emp.path,
      doj: emp.doj
    }
    this.holdingValueEmployee = [];
    this.holdingValueEmployee.push(employee);
    this.appService.saveEmployee(employee).subscribe((data: Employee) => {
      console.log(data);
      this.router.navigate(['/']);
    },
    (error) => console.log(error)
    );
  }

  returnToHome() {
    alert('No new employee added!');
    this.router.navigate(['/']);
  }

}
