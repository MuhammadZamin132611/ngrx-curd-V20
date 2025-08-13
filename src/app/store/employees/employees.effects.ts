import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../../employee/services/employee-service";
import * as EmployeesActions from './employees.actions';
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class EmployeesEffects {
    actions$ = inject(Actions);
    empService = inject(EmployeeService);
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.loadEmployees),
            mergeMap(() =>
                this.empService.getAllEmployee().pipe(
                    map(employees => EmployeesActions.loadEmployeesSuccess({ employees })),
                    catchError(error => of(EmployeesActions.loadEmployeesFailure({ error })))
                )
            )
        )
    );
}