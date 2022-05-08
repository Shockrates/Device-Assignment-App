import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {

  id: string = '';
  employee!: Employee;
  subscription!: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataStoreService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.employee$.subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        //alert("Error while fetching");
        console.log(err);

      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
