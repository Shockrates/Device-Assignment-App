import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { EmployeeService } from '../services/employee.service';

@Directive({
    selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective {
    constructor() {}
}

export function uniqueUsernameUpdateValidator(userService: EmployeeService): AsyncValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | any => {
        return userService.getUserByUsername(c.value).pipe(
            map((user) => {
                if (user.name.length > 0) {
                    //var username = user[0]['username'];
                    var username = user.name;
                } else {
                    return null;
                }
                return username;
            })
        );
    };
}
