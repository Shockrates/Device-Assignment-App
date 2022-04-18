import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {

  id: string = '';
  employee!: Employee; 
  
  constructor(private router:Router, private route: ActivatedRoute, private dataservice: DataService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.dataservice.employee.subscribe(data=>{
      // if (!data) {
      //   this.router.navigate(['']);
      // }else{
      //   this.employee = data;
      // }
      this.employee = data;
      });
  }

}
