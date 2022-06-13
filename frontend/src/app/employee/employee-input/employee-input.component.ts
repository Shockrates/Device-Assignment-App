import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { uniqueEmailValidator } from 'src/app/shared/custom-validation';

@Component({
    selector: 'app-employee-input',
    templateUrl: './employee-input.component.html',
    styleUrls: ['./employee-input.component.scss']
})
export class EmployeeInputComponent implements OnInit {
    private subscription!: Subscription;

    employeeForm: FormGroup | any;
    actionType: string = 'Save';

    constructor(@Inject(MAT_DIALOG_DATA) public employee: Employee, private formBuilder: FormBuilder, private employeeService: EmployeeService, private dialogRef: MatDialogRef<EmployeeInputComponent>) { }

    ngOnInit(): void {
        this.buildEmployeeForm();
        if (this.employee) {
            this.setEmployeeForm(this.employee)
        }

    }

    get nameControls() {
        return this.employeeForm.controls['name'];
    }

    get emailControls() {
        return this.employeeForm.controls['email'];
    }

    buildEmployeeForm() {
        this.employeeForm = this.formBuilder.group({
            name: ['', [Validators.minLength(3), Validators.required]],
            email: ['', {
                validators: [Validators.required, Validators.email],
                asyncValidators: [uniqueEmailValidator(this.employeeService, this.employee?.email)],
                updateOn: 'blur'
            }]
        });
    }

    setEmployeeForm(employee: Employee) {

        this.actionType = 'Update';
        this.nameControls.setValue(employee.name);
        this.emailControls.setValue(employee.email);

    }

    submit() {
        if (!this.employee) {
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
            this.employeeService.updateEmployee(this.employeeForm.value, this.employee._id).subscribe({
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
