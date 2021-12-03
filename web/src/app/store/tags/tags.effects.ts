import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { TagsService } from "src/app/cores/services/tags.service";
import { catchError, map, switchMap } from "rxjs/operators";
import * as tagActions from "./tags.actions";
import { Tag } from "src/app/config/interfaces";

@Injectable()
export class TagsEffects {
    constructor(
        private actions$: Actions,
        private tagService: TagsService
    ) {}

    
    Add: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.ADD),
        map((action: tagActions.Add) => action.tag),
        switchMap((tag) => {
            return this.tagService.Create(tag)
                .pipe(
                    map((res: any) => { return new tagActions.AddSuccess(res.data as Tag); }),
                    catchError(err => { return of(new tagActions.AddFailure(err)); })                    
                );
        })
    ));

    Get: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.GET),
        map((action: tagActions.Get) => action.tagId),
        switchMap((tagId: string) => {
            return this.tagService.Retrieve(tagId)
                .pipe(
                    map((res: any) => { return new tagActions.GetSuccess(res.data as Tag); }),
                    catchError(err => { return of(new tagActions.GetFailure(err)); })
                )
        })
    ));

    
    Fetch: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.FETCH),         
        switchMap(() => {
            return this.tagService.List()
                .pipe(
                    map((res: any) => { return new tagActions.FetchSuccess(res.data as Tag[]); }),
                    catchError(err => { return of(new tagActions.FetchFailure(err)); })
                );
        })
    ));

    
    Update: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.UPDATE),
        map((action: tagActions.Update) => action.payload),
        switchMap((payload: any) => {
            return this.tagService.Update(payload.tagId, payload.name)
                .pipe(
                    map((res: any) => { return new tagActions.UpdateSuccess({ tagId: payload.tagId, name: payload.name, message: res.message }); }),
                    catchError(err => { return of(new tagActions.UpdateFailure(err)); })
                )
        })
    ));

    
    Delete: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.DELETE),
        map((action: tagActions.Delete) => action.tagId),
        switchMap((tagId: string) => {
            return this.tagService.Delete(tagId)
                .pipe(
                    map((res: any) => { return new tagActions.DeleteSuccess({ tagId, message: res.message }); }),
                    catchError(err => { return of(new tagActions.DeleteFailure(err)) })
                )
        })
    ));
}