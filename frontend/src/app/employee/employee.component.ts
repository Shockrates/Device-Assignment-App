import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation/delete-confirmation.component';
import { EmployeeInputComponent } from './employee-input/employee-input.component';
import { DataStoreService } from '../services/data-store.service';

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
            cell: (employee: Employee) => `${employee.employeeId}`
        },
        {
            columnDef: 'name',
            header: 'Name',
            cell: (employee: Employee) => `${employee.name}`
        },
        {
            columnDef: 'email',
            header: 'Email',
            cell: (employee: Employee) => `${employee.email}`
        }
    ];

    displayedColumns: string[] = this.columns.map((c) => c.columnDef).concat(['actions']);

    subscriptions: Subscription[] = [];

    employees: Array<Employee> = [];

    constructor(private dialog: MatDialog, private employeeService: EmployeeService, private dataService: DataStoreService, private router: Router) {}

    ngOnInit(): void {
        this.getAllEmployees();
    }

    ngOnDestroy() {
        //this.notifierSubscription.unsubscribe();
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    notifierSubscription: Subscription = this.dataService.subjectNotifier.subscribe((notified) => {
        // originator has notified me. refresh my data here.
        this.getAllEmployees();
    });

    getAllEmployees() {
        var sub = this.employeeService.getAllEmployees().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res.employees);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (err) => {
                alert('Error while fetching');
            }
        });
        this.subscriptions.push(sub);
    }

    select(row: Employee) {
        //this.dataService.changeEmployee(row);
        this.router.navigate(['/employee', row._id]);
    }

    editEmployee(e: MouseEvent, row: any) {
        e.stopImmediatePropagation();
        var sub = this.dialog
            .open(EmployeeInputComponent, {
                width: '40%',
                data: row
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'update') {
                    this.getAllEmployees();
                }
            });
        this.subscriptions.push(sub);
    }

    openConfirmDelete(e: MouseEvent, row: Employee) {
        e.stopImmediatePropagation();
        var sub = this.dialog
            .open(DeleteConfirmationComponent, {
                width: '40%',
                data: `Employee name: ${row.name}. Are you sure you want to delete?`
            })
            .afterClosed()
            .subscribe((val) => {
                if (val === 'delete') {
                    this.deleteEmployee(row._id);
                }
            });
        this.subscriptions.push(sub);
    }

    deleteEmployee(_id: string) {
        var sub = this.employeeService.deleteEmployee(_id).subscribe({
            next: (res) => {
                this.getAllEmployees();
            },
            error: (err) => {
                alert('Error while Deleting');
            }
        });
        this.subscriptions.push(sub);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
