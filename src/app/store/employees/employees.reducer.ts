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

    // load Employee
    on(EmployeesActions.loadEmployees, state => ({
        ...state,
        loading: true
    })),

    on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees,
        loading: false,
        loaded: true
    })),

    on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Add Employee
    on(EmployeesActions.addEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees: [...state.employees, employees],
        error: null
    })),

    on(EmployeesActions.addEmployeesFailure, (state, { error }) => ({
        ...state,
        error
    })),

    // Update Employee
    on(EmployeesActions.updateEmployee, (state) => ({
        ...state,
        loading: true
    })),

    on(EmployeesActions.updateEmployeeSuccess, (state, { employees }) => ({
        ...state,
        loading: false,
        employees: state.employees.map(emp =>
            emp.id === employees.id ? { ...emp, ...employees } : emp
        )
    })),

    on(EmployeesActions.updateEmployeeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)