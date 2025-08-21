import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../../employee/model/login.model";

export const loadProfile = createAction('[Profile] Load Profile');
export const loadProfileSuccess = createAction('[Profile] Load Profile Success', props<{ user: LoginModel[] }>());
export const loadProfileFailure = createAction('[Profile] Load Profile Failure', props<{ error: any }>());