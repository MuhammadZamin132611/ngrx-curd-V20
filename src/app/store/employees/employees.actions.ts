import { createAction, props } from "@ngrx/store";
import { EmployeeModel } from "../../employee/model/employeemodel";

export const loadEmployees = createAction('[Employees] Load Employees');
export const loadEmployeesSuccess = createAction('[Employees] Load Employees Success', props<{ employees: EmployeeModel[] }>());
export const loadEmployeesFailure = createAction('[Employees] Load Employees Failure', props<{ error: any }>());

