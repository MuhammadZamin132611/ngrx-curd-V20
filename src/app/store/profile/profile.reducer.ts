import { createReducer, on } from "@ngrx/store";
import { LoginModel } from "../../employee/model/login.model";
import * as ProfileAction from './profile.actions'

export interface ProfileState {
    user: LoginModel[];
    selectedUser: LoginModel | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initiatProfileState: ProfileState = {
    user: [],
    selectedUser: null,
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

    on(ProfileAction.loadProfileSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false,
        loaded: true
    })),

    on(ProfileAction.loadProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Get By Id

    on(ProfileAction.loadProfileById, state => ({
        ...state,
        loading: true
    })),

    on(ProfileAction.loadProfileByIdSuccess, (state, { users }) => ({
        ...state,
        selectedUser: users,
        loading: false,
        loaded: true
    })),

    on(ProfileAction.loadProfileByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // Update Profile

    on(ProfileAction.updateProfile, (state) => ({
        ...state,
        loading: true
    })),

    on(ProfileAction.updateProfileSuccess, (state, { users }) => ({
        ...state,
        selectedUser: users,
        user: state.user.map(u => u.id === users.id ? users : u),
        loading: false,
        loaded: true
    })),

    on(ProfileAction.updateProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
)