import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../../employee/services/employee-service";
import * as EmployeesActions from './employees.actions';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectEmployeesLoaded } from "./employees.selectors";

@Injectable()
export class EmployeesEffects {
    actions$ = inject(Actions);
    empService = inject(EmployeeService);
    store = inject(Store);

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.loadEmployees),
            withLatestFrom(this.store.select(selectEmployeesLoaded)),
            filter(([_, loaded])=>!loaded),
            mergeMap(() =>
                this.empService.getAllEmployee().pipe(
                    map(employees => EmployeesActions.loadEmployeesSuccess({ employees })),
                    catchError(error => of(EmployeesActions.loadEmployeesFailure({ error })))
                )
            )
        )
    );
}