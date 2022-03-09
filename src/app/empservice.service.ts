import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  constructor(private http: HttpClient) { }

                 getEmployee()
                {
                return this.http.get<any>('http://localhost:3000/posts');
                
                }           
                public postEmployee(data:any)
                {
                return this.http.post<any>('http://localhost:3000/posts',data);
                
                }

                 deleteEmployee(id:number)
                 {
                   return this.http.delete<any>('http://localhost:3000/posts/'+id);
                  
                 }      
                 updateEmployee(id:number,data:any)
                 {
                   return this.http.put<any>('http://localhost:3000/posts/'+id,data);
                 
                 }
              }
                       