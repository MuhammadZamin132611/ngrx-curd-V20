import { createReducer, on } from "@ngrx/store";
import * as EmployeesActions from './employees.actions';
import { EmployeeModel } from "../../employee/model/employeemodel";

export interface EmployeesState {
    employees: EmployeeModel[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: EmployeesState = {
    employees: [],
    loading: false,
    loaded: false,
    error: null
}

export const employeesReducer = createReducer(
    initialState,
    on(EmployeesActions.loadEmployees, state => ({
        ...state,
        loading: true
    })),

    on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees,
        loading: false,
        loaded:true
    })),
    on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)