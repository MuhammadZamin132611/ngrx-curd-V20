import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../../employee/services/employee-service";
import * as EmployeesActions from './employees.actions';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectEmployeesLoaded } from "./employees.selectors";
import { EmployeeModel } from "../../employee/model/employeemodel";

@Injectable()
export class EmployeesEffects {
    actions$ = inject(Actions);
    store = inject(Store);
    empService = inject(EmployeeService);

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.loadEmployees),
            withLatestFrom(this.store.select(selectEmployeesLoaded)),
            filter(([_, loaded]) => !loaded),
            mergeMap(() =>
                this.empService.getAllEmployee().pipe(
                    map(employees => EmployeesActions.loadEmployeesSuccess({ employees })),
                    catchError(error => of(EmployeesActions.loadEmployeesFailure({ error })))
                )
            )
        )
    );

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.addEmployee),
            mergeMap(action =>
                this.empService.addEmployee(action.employees).pipe(
                    map(employees => EmployeesActions.addEmployeesSuccess({ employees })),
                    catchError(error =>
                        of(EmployeesActions.addEmployeesFailure({ error }))
                    )
                )
            )
        )
    );

    updateEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.updateEmployee),
            mergeMap(({ id, changes }) => {
                const fullEmployee: EmployeeModel = { id, ...changes } as EmployeeModel;
                return this.empService.updateEmployee(id, fullEmployee).pipe(
                    map((employees) => EmployeesActions.updateEmployeeSuccess({ employees })),
                    catchError((error) => of(EmployeesActions.updateEmployeeFailure({ error })))
                );
            })
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.deleteEmployee),
            mergeMap(({ id }) =>
                this.empService.deleteEmployee(id).pipe(
                    map(() => EmployeesActions.deleteEmployeeSuccess({ id })),
                    catchError((error) =>
                        of(EmployeesActions.deleteEmployeeFailure({ error }))
                    )
                )
            )
        )
    );
}