import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
    selector: 'app-employee-input',
    templateUrl: './employee-input.component.html',
    styleUrls: ['./employee-input.component.scss']
})
export class EmployeeInputComponent implements OnInit {
    private subscription!: Subscription;

    employeeForm: FormGroup | any;
    actionType: string = 'Save';

    constructor(@Inject(MAT_DIALOG_DATA) public data: Employee, private formBuilder: FormBuilder, private employeeService: EmployeeService, private dialogRef: MatDialogRef<EmployeeInputComponent>) {}

    ngOnInit(): void {
        this.employeeForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required]
        });
        if (this.data) {
            this.actionType = 'Update';
            this.employeeForm.controls['name'].setValue(this.data.name);
            this.employeeForm.controls['email'].setValue(this.data.email);
        }
    }

    submit() {
        if (!this.data) {
            this.addEmployee();
        } else {
            this.updateEmployee();
        }
    }

    addEmployee() {
        if (this.employeeForm.valid) {
            this.employeeService.createEmployee(this.employeeForm.value).subscribe({
                next: (res) => {
                    // alert("New employee added");
                    console.log(res);
                    this.employeeForm.reset();
                    this.dialogRef.close('save');
                },
                error: (err) => {
                    //alert(err)
                    console.log(err);
                }
            });
        }
    }

    updateEmployee() {
        if (this.employeeForm.valid) {
            this.employeeService.updateEmployee(this.employeeForm.value, this.data._id).subscribe({
                next: (res) => {
                    //alert("employee updated");
                    console.log(res);

                    this.employeeForm.reset();
                    this.dialogRef.close('update');
                },
                error: () => {
                    alert('Error while updating employee');
                }
            });
        }
    }
}
