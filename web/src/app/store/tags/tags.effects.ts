import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { TagsService } from "src/app/services/tags.service";
import { catchError, map, switchMap } from "rxjs/operators";
import * as tagActions from "./tags.actions";
import { Tag } from "src/app/config/interfaces";

@Injectable()
export class TagsEffects {
    constructor(
        private actions$: Actions,
        private tagService: TagsService
    ) {}

    @Effect()
    Add: Observable<any> = this.actions$.pipe(
        ofType(tagActions.TagsActionType.ADD),
        map((action: tagActions.Add) => action.tag),
        switchMap((tag) => {
            return this.tagService.Create(tag)
                .pipe(
                    map(res => { return new tagActions.AddSuccess(res as Tag); }),
                    catchError(err => { return of(new tagActions.AddFailure(err)); })                    
                );
        })
    );

    @Effect()
    Fetch: Observable<any> = this.actions$.pipe(
        ofType(tagActions.TagsActionType.FETCH),         
        switchMap(() => {
            return this.tagService.List()
                .pipe(
                    map(res => { return new tagActions.FetchSuccess(res as Tag[]); }),
                    catchError(err => { return of(new tagActions.FetchFailure(err)); })
                );
        })
    );

    @Effect()
    Update: Observable<any> = this.actions$.pipe(
        ofType(tagActions.TagsActionType.UPDATE),
        map((action: tagActions.Update) => action.payload),
        switchMap((payload: any) => {
            return this.tagService.Update(payload.tagId, payload.name)
                .pipe(
                    map((res: any) => { return new tagActions.UpdateSuccess({ tagId: payload.tagId, name: payload.name, message: res.message }); }),
                    catchError(err => { return of(new tagActions.UpdateFailure(err)); })
                )
        })
    );

    @Effect()
    Delete: Observable<any> = this.actions$.pipe(
        ofType(tagActions.TagsActionType.DELETE),
        map((action: tagActions.Delete) => action.tagId),
        switchMap((tagId: string) => {
            return this.tagService.Delete(tagId)
                .pipe(
                    map((res: any) => { return new tagActions.DeleteSuccess({ tagId, message: res.message }); }),
                    catchError(err => { return of(new tagActions.DeleteFailure(err)) })
                )
        })
    );
}