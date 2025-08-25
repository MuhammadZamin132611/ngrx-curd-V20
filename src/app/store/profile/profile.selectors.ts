import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginModel } from "../../employee/model/login.model";
import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectAllProfile = createSelector(
    selectProfileState,
    state => state.user
)

export const selectSelectedUser = createSelector(
    selectProfileState,
    state => state.selectedUser
)

export const selectProfileLoading = createSelector(
    selectProfileState,
    state => state.loading
)

export const selectProfileLoaded = createSelector(
    selectProfileState,
    state => state.loaded
)


export const selectProfileError = createSelector(
    selectProfileState,
    state => state.error
)

export const selectProfileById = (id: string) =>
    createSelector(selectProfileState, (state) =>
        state.user.find(profile => profile.id === id)
    )

