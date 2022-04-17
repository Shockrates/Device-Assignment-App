import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  columns = [
    {
      columnDef: 'id',
      header: 'Id',
      cell: (employee: Employee) => `${employee.id}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (employee: Employee) => `${employee.name}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (employee: Employee) => `${employee.email}`,
    }
  ];

  displayedColumns: string[] = this.columns.map(c => c.columnDef).concat(['actions']);

  subscriptions: Subscription[] = []

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ngOnDestroy() {
    //this.notifierSubscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getAllEmployees() {
    var sub = this.employeeService.getAllEmployees()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: (err) => {
          alert("Error while fetching");
        }
      })
    this.subscriptions.push(sub);
  }

  editDevice(e: MouseEvent, row: any) { }
  openConfirmDelete(e: MouseEvent, row: any) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
