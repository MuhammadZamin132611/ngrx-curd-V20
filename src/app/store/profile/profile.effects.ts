import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as ProfileAction from './profile.actions'
import { ProfileService } from "../../employee/services/profile-service";
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { selectProfileLoaded, selectSelectedUser } from "./profile.selectors";

@Injectable()
export class ProfileEffects {
    actions$ = inject(Actions);
    store = inject(Store);
    profileService = inject(ProfileService);

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileAction.loadProfile),
            withLatestFrom(this.store.select(selectProfileLoaded)),
            filter(([_, loaded]) => !loaded),
            mergeMap(() =>
                this.profileService.getUser().pipe(
                    map(users => ProfileAction.loadProfileSuccess({ users })),
                    catchError(error => of(ProfileAction.loadProfileFailure({ error })))
                )
            )
        )
    );

    loadProfileById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileAction.loadProfileById),
            withLatestFrom(this.store.select(selectSelectedUser)),
            filter(([action, selectedUser])=> !selectedUser || selectedUser.id !== action.id),
            mergeMap(([action]) =>
                this.profileService.getUserById(action.id).pipe(
                    map(userArray => ProfileAction.loadProfileByIdSuccess({ users: userArray[0] })),
                    catchError(error => of(ProfileAction.loadProfileByIdFailure({ error })))
                )
            )
        )
    )

}