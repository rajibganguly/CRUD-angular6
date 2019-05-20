import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee/employee.module';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {}
  dataServerUrl = 'http://localhost:3004/Employees';


  getEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.dataServerUrl);
  }

  deleteEmployeePerm(id: number) {
    this.httpClient.delete(`${this.dataServerUrl}/${id}`).subscribe((x) => {
      // console.log(x);
      location.reload();
    });
  }

  saveEmployee(employee: Employee): Observable<any> {
    if(employee.id === null) {
      // console.log(employee.id);
      // console.log(employee);
      return this.httpClient.post<Employee>(this.dataServerUrl, employee, {
        headers: new HttpHeaders({
           'Content-Type': 'application/json'
         })
       })
    }
   }


   editEmployee(employee: Employee): Observable<void> {
      console.log(employee.id);
      console.log(employee);
      return this.httpClient.put<void>(`${this.dataServerUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
           'Content-Type': 'application/json'
         })
       })
   }




}
