import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Employee } from '../employee/employee.module';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  allGetData;
  display = true;

  constructor(private appService: AppService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(d => {
      this.display = true;
      const plot = d['params']['id'];
      this.appService.getEmployeeById(plot).pipe(
        map(x => x)
      ).subscribe(d => {
        this.allGetData = d;
        this.display = false;
        console.log(this.allGetData);
      })
    })
  }



  editModeOn(x: object) {
    this.router.navigate(['/edit',x['id']]);
  }

}





// employeeEditLists = [];
//   display = true;
//   subscription: Subscription;

//   constructor(private appService: AppService, private router: Router) {
//   }

//   ngOnInit() {
//     this.appService.editEmployee$.subscribe((d) => {
//       this.employeeEditLists = d;
//       console.log(d);
//     });
