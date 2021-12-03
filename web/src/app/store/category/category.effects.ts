import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { CategoryService } from "src/app/cores/services/category.service";
import { catchError, map, switchMap } from "rxjs/operators";
import * as categoryActions from "./category.actions";
import { Category } from "src/app/config/interfaces";

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService
    ) {}

    
    Add: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.ADD),
        map((action: categoryActions.Add) => action.category),
        switchMap((category) => {
            return this.categoryService.Create(category)
                .pipe(
                    map((res: any) => { return new categoryActions.AddSuccess(res.data as Category); }),
                    catchError(err => { return of(new categoryActions.AddFailure(err)); })                    
                );
        })
    ));

    
    Fetch: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.FETCH),
        map((action: categoryActions.Fetch) => action.tagId),
        switchMap((tagId) => {
            return this.categoryService.getCategoryByTag(tagId)
                .pipe(
                    map((res: any) => { return new categoryActions.FetchSuccess(res.data as Category[]); }),
                    catchError(err => { return of(new categoryActions.FetchFailure(err)); })
                );
        })
    ));

    
    Update: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.UPDATE),
        map((action: categoryActions.Update) => action.payload),
        switchMap((payload: any) => {
            return this.categoryService.Update(payload.categoryId, payload.name)
                .pipe(
                    map((res: any) => { return new categoryActions.UpdateSuccess({ categoryId: payload.categoryId, name: payload.name, message: res.message }); }),
                    catchError(err => { return of(new categoryActions.UpdateFailure(err)); })
                )
        })
    ));

    
    Delete: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.DELETE),
        map((action: categoryActions.Delete) => action.categoryId),
        switchMap((categoryId: string) => {
            return this.categoryService.Delete(categoryId)
                .pipe(
                    map((res: any) => { return new categoryActions.DeleteSuccess({ categoryId, message: res.message }); }),
                    catchError(err => { return of(new categoryActions.DeleteFailure(err)) })
                )
        })
    ));
}