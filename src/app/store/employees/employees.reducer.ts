import { createReducer, on } from "@ngrx/store";
import * as EmployeesActions from './employees.actions';
import { EmployeeModel } from "../../employee/model/employeemodel";

export interface EmployeesState {
    employees: EmployeeModel[];
    loading: boolean;
    error: any;
}

export const initialState: EmployeesState = {
    employees: [],
    loading: false,
    error: null
}

export const employeesReducer = createReducer(
    initialState,
    on(EmployeesActions.loadEmployees, state => ({ ...state, loading: true })),
    on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees,
        loading: false
    })),
    on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)