import { createAction, props } from "@ngrx/store";
import { EmployeeModel } from "../../employee/model/employeemodel";

export const loadEmployees = createAction('[Employees] Load Employees');
export const loadEmployeesSuccess = createAction('[Employees] Load Employees Success', props<{ employees: EmployeeModel[] }>());
export const loadEmployeesFailure = createAction('[Employees] Load Employees Failure', props<{ error: any }>());

export const addEmployee = createAction('[Employee] Add Employee', props<{ employees: EmployeeModel }>());
export const addEmployeesSuccess = createAction('[Employees] Add Employees Success', props<{ employees: EmployeeModel }>());
export const addEmployeesFailure = createAction('[Employees] Load Employees Failure', props<{ error: any }>());

export const updateEmployee = createAction('[Employees] Update Employee', props<{ id: string | undefined, changes: Partial<EmployeeModel> }>());
export const updateEmployeeSuccess = createAction('[Employees] Update Employee Success', props<{ employees: EmployeeModel }>());
export const updateEmployeeFailure = createAction('[Employees] Update Employee Failure', props<{ error: any }>());

export const deleteEmployee = createAction('[Employee] Delete Employee', props<{ id: string }>());
export const deleteEmployeeSuccess = createAction('[Employee] Delete Employee Success', props<{ id: string }>());
export const deleteEmployeeFailure = createAction('[Employee] Delete Employee Failure', props<{ error: any }>());