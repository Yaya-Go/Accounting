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

    
    AddCategory: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.ADD_CATEGORY),
        map((action: categoryActions.AddCategory) => action.category),
        switchMap((category) => {
            return this.categoryService.Create(category)
                .pipe(
                    map((res: any) => { return new categoryActions.AddCategorySuccess(res.data as Category); }),
                    catchError(err => { return of(new categoryActions.AddCategoryFailure(err)); })                    
                );
        })
    ));

    
    FetchCategory: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.FETCH_CATEGORY),
        map((action: categoryActions.FetchCategory) => action.tagId),
        switchMap((tagId) => {
            return this.categoryService.getCategoryByTag(tagId)
                .pipe(
                    map((res: any) => { return new categoryActions.FetchCategorySuccess(res.data as Category[]); }),
                    catchError(err => { return of(new categoryActions.FetchCategoryFailure(err)); })
                );
        })
    ));

    
    UpdateCategory: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.UPDATE_CATEGORY),
        map((action: categoryActions.UpdateCategory) => action.payload),
        switchMap((payload: any) => {
            return this.categoryService.Update(payload.categoryId, payload.name)
                .pipe(
                    map((res: any) => { return new categoryActions.UpdateCategorySuccess({ categoryId: payload.categoryId, name: payload.name, message: res.message }); }),
                    catchError(err => { return of(new categoryActions.UpdateCategoryFailure(err)); })
                )
        })
    ));

    
    DeleteCategory: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(categoryActions.CategoryActionType.DELETE_CATEGORY),
        map((action: categoryActions.DeleteCategory) => action.categoryId),
        switchMap((categoryId: string) => {
            return this.categoryService.Delete(categoryId)
                .pipe(
                    map((res: any) => { return new categoryActions.DeleteCategorySuccess({ categoryId, message: res.message }); }),
                    catchError(err => { return of(new categoryActions.DeleteCategoryFailure(err)) })
                )
        })
    ));
}