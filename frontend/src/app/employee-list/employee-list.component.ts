import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


  employee: Employee = new Employee();

  employees?: Employee[];
  filteredEmployee : any ;
  searchValue?: string;
  noDataFound? : boolean ;

  constructor(private employeeService: EmployeeService,
    private router : Router) { }

  ngOnInit(): void {

  this.getEmployees();

  }

  private getEmployees(){
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
    })
  }

  updateEmployee(id?:number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id?:number){
    this.employeeService.deleteEmployee(id).subscribe( data => {

      this.getEmployees();
    })
  }

  employeeDetails(id?:number){
    this.router.navigate(['employee-details',id]);

  }

  applyFilter(value : any){
    this.filteredEmployee = this.employees?.filter(emp => emp.firstName?.toLowerCase().includes(value.toLowerCase()));
    this.noDataFound = this.filteredEmployee.length === 0 ? true : false;
  }

}
