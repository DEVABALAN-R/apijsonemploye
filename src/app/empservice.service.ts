import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from './empdashboard/empdashboard.model';
EmployeeModel

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService{
  readonly baseURL = 'http://localhost:3000/lists';

  constructor(private http: HttpClient) { }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }
  
  postEmployee(emp: EmployeeModel) {
    return this.http.post(this.baseURL, emp);
  }
 putEmployee(emp: EmployeeModel) {
    return this.http.patch(this.baseURL + `/${emp._userId}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}