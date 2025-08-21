import { createReducer, on } from "@ngrx/store";
import { LoginModel } from "../../employee/model/login.model";
import * as ProfileAction from './profile.actions'

export interface ProfileState {
    user: LoginModel[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initiatProfileState: ProfileState = {
    user: [],
    loading: false,
    loaded: false,
    error: null
}

export const profileReducre = createReducer(
    initiatProfileState,

    // load Profile 
    on(ProfileAction.loadProfile, state => ({
        ...state,
        loading: true
    })),

    on(ProfileAction.loadProfileSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        loaded: true
    })),

    on(ProfileAction.loadProfileFailure, (state, { error }) => ({
        ...state,
        loading:false,
        error: null
    }))
)