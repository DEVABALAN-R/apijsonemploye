import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms';
import { EmpserviceService } from '../empservice.service';
import { EmployeeModel } from './empdashboard.model';

@Component({
  selector: 'app-empdashboard',
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {
 
  formValue !:  FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  
  showadd !: boolean;
  showupdate !: boolean;

  constructor(private formbuilder:FormBuilder,private api:EmpserviceService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name : [''],
      email :[''],
      mobile :['']
                 
  })
this. getEmployeeDetails();
}
postEmployeeDetails()
    {
         this.employeeModelObj.name = this.formValue.value.name;
         this.employeeModelObj.email = this.formValue.value.email;
         this.employeeModelObj.mobile = this.formValue.value.mobile;
   
         this.api.postEmployee(this.employeeModelObj)
         .subscribe
         (res=>
                {
                  console.log(res);
                  alert("added successfullly")
                  let ref = document.getElementById('cancel')
                  ref?.click();
                  this.formValue.reset();
                  this. getEmployeeDetails();
                 },err=>{
                   alert(err);
                 }
          )
     }
     getEmployeeDetails()
     {
       this.api.getEmployeeList()
       .subscribe
       (res=>
         {
           this.employeeData = res;
         }
       )
     }
   deleteEmployeeDetails(row : any)
     {
       this.api.deleteEmployee(row.id)
       .subscribe(res=>
         {
           alert("deleted");
           this.getEmployeeDetails();
         },err=>
         {
           alert("some error");
         }     
                 )
       } 
       onEdit(row:any){
        
        this.showadd = false;
        this.showupdate = true; 
        
        this.employeeModelObj._userId=row.id;
        this.formValue.controls['name'].setValue(row.name);
        this.formValue.controls['email'].setValue(row.email);
        this.formValue.controls['mobile'].setValue(row.mobile);
       }
   
       updateEmployeeDetails(){
        this.employeeModelObj.name = this.formValue.value.name;
        this.employeeModelObj.email = this.formValue.value.email;
        this.employeeModelObj.mobile = this.formValue.value.mobile;
        this.api.putEmployee(this.employeeModelObj)
        .subscribe(res=>
          {
            alert("updated");
            let ref = document.getElementById('cancel')
            ref?.click();
            this.formValue.reset();
            this.getEmployeeDetails();
           
         
      
      
        } )
       }
whenclickadd(){
  this.formValue.reset();
  this.showadd = true;
  this.showupdate = false; 
}
}
