import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../../employee/model/login.model";

export const loadProfile = createAction('[Profile] Load Profile');
export const loadProfileSuccess = createAction('[Profile] Load Profile Success', props<{ users: LoginModel }>());
export const loadProfileFailure = createAction('[Profile] Load Profile Failure', props<{ error: any }>());

export const loadProfileById = createAction('[Profile] Load Profile By Id', props<{ id: string }>());
export const loadProfileByIdSuccess = createAction('[Profile] Load Profile By Id Success', props<{ users: LoginModel }>());
export const loadProfileByIdFailure = createAction('[Profile] Load Profile By Id Failure', props<{ error: any }>());

export const updateProfile = createAction('[Profile] Update Profile', props<{ id: string; changes: Partial<LoginModel> }>());
export const updateProfileSuccess = createAction('[Profile] Update Profile Success', props<{ users: LoginModel }>());
export const updateProfileFailure = createAction('[Profile] Update Profile Failure', props<{ error: any }>());
