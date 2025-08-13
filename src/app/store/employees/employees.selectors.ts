import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeesState } from "./employees.reducer";

export const selectEmployeesState = createFeatureSelector<EmployeesState>('employees');

export const selectAllEmployees = createSelector(
    selectEmployeesState,
    state => state.employees
)

export const selectEmployeesLoading = createSelector(
    selectEmployeesState,
    state => state.loading
)