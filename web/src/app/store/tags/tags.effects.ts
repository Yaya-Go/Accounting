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

    
    AddTransaction: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.ADD_TAG),
        map((action: tagActions.AddTag) => action.tag),
        switchMap((tag) => {
            return this.tagService.Create(tag)
                .pipe(
                    map((res: any) => { return new tagActions.AddTagSuccess(res.data as Tag); }),
                    catchError(err => { return of(new tagActions.AddTagFailure(err)); })                    
                );
        })
    ));

    GetTag: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.GET_TAG),
        map((action: tagActions.GetTag) => action.tagId),
        switchMap((tagId: string) => {
            return this.tagService.Retrieve(tagId)
                .pipe(
                    map((res: any) => { return new tagActions.GetTagSuccess(res.data as Tag); }),
                    catchError(err => { return of(new tagActions.GetTagFailure(err)); })
                )
        })
    ));

    
    FetchTag: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.FETCH_TAG),         
        switchMap(() => {
            return this.tagService.List()
                .pipe(
                    map((res: any) => { return new tagActions.FetchTagSuccess(res.data as Tag[]); }),
                    catchError(err => { return of(new tagActions.FetchTagFailure(err)); })
                );
        })
    ));

    
    UpdateTag: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.UPDATE_TAG),
        map((action: tagActions.UpdateTag) => action.payload),
        switchMap((payload: any) => {
            return this.tagService.Update(payload.tagId, payload.name)
                .pipe(
                    map((res: any) => { return new tagActions.UpdateTagSuccess({ tagId: payload.tagId, name: payload.name, message: res.message }); }),
                    catchError(err => { return of(new tagActions.UpdateTagFailure(err)); })
                )
        })
    ));

    
    DeleteTag: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(tagActions.TagsActionType.DELETE_TAG),
        map((action: tagActions.DeleteTag) => action.tagId),
        switchMap((tagId: string) => {
            return this.tagService.Delete(tagId)
                .pipe(
                    map((res: any) => { return new tagActions.DeleteTagSuccess({ tagId, message: res.message }); }),
                    catchError(err => { return of(new tagActions.DeleteTagFailure(err)) })
                )
        })
    ));
}