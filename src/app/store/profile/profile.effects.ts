import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as ProfileAction from './profile.actions'
import { ProfileService } from "../../employee/services/profile-service";
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { selectProfileLoaded } from "./profile.selectors";

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
    )

}