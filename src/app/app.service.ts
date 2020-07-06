import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Employee } from './employee/employee.module';

import { environment } from './../environments/environment';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {}
  dataServerUrl = environment.dataurl;
  // setEmployeeDetail: any[] = [];
// set for store edit employee
  public editEmployeeArr: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  editEmployee$: Observable<any> = this.editEmployeeArr.asObservable();

  //handle error
  private handleError(errorResponse: HttpErrorResponse) {
    if(errorResponse.error instanceof ErrorEvent) {
      console.error('client side', errorResponse.error.message)
    } else {
      console.error('server side', errorResponse)
    }
    return throwError('There is something issues to look');
  }
  // get all
  getEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.dataServerUrl);
  }

  // get by id
  getEmployeeById(id: number ): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.dataServerUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  

  deleteEmployeePerm(id: number) {
    this.httpClient.delete(`${this.dataServerUrl}/${id}`).subscribe((x) => {
      // console.log(x);
      location.reload();
    });
  }

  saveEmployee(employee: Employee): void {
    if(!employee.id) {
      console.log(employee.id);
      console.log(employee);
      this.httpClient.post<Employee>(this.dataServerUrl, employee, {
        headers: new HttpHeaders({
           'Content-Type': 'application/json'
         })
       }).subscribe((d) => {
        console.log(d)
       },
         (error) => console.log(error)
         )
    }
   }


   editEmployee(employee: Employee): Observable<void> {
      console.log(employee.id);
      console.log(employee);
      return this.httpClient.patch<void>(`${this.dataServerUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
           'Content-Type': 'application/json'
         })
       })
   }



  editExistingEmpArray(employee: any) {
    this.editEmployee$.pipe(take(1)).subscribe(val => {
      console.log(val)
      const newArr = [val, employee];
      this.editEmployeeArr.next(newArr);
    });
  }




}
