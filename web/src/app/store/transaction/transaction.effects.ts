import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { TransactionService } from "src/app/cores/services/transaction.service";
import { catchError, map, switchMap } from "rxjs/operators";
import * as transActions from "./transaction.actions";
import { Transaction } from "src/app/config/interfaces";

@Injectable()
export class TransactionEffects {
    constructor(
        private actions$: Actions,
        private transService: TransactionService
    ) {}

    
    AddTransaction: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(transActions.TransactionsActionType.ADD_TRANSACTION),
        map((action: transActions.AddTransaction) => action.trans),
        switchMap((trans) => {
            return this.transService.Create(trans)
                .pipe(
                    map((res: any) => { return new transActions.AddTransactionSuccess(res.data as Transaction); }),
                    catchError(err => { return of(new transActions.AddTransactionFailure(err)); })                    
                );
        })
    ));

    GetTransaction: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(transActions.TransactionsActionType.GET_TRANSACTION),
        map((action: transActions.GetTransaction) => action.transId),
        switchMap((transId: string) => {
            return this.transService.Retrieve(transId)
                .pipe(
                    map((res: any) => { return new transActions.GetTransactionSuccess(res.data as Transaction); }),
                    catchError(err => { return of(new transActions.GetTransactionFailure(err)); })
                )
        })
    ));
    
    UpdateTransaction: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(transActions.TransactionsActionType.UPDATE_TRANSACTION),
        map((action: transActions.UpdateTransaction) => action.payload),
        switchMap((payload: any) => {
            return this.transService.Update(payload.transId, payload.trans)
                .pipe(
                    map((res: any) => { return new transActions.UpdateTransactionSuccess({ transId: payload.transId, trans: payload.trans, message: res.message }); }),
                    catchError(err => { return of(new transActions.UpdateTransactionFailure(err)); })
                )
        })
    ));

    
    DeleteTransaction: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(transActions.TransactionsActionType.DELETE_TRANSACTION),
        map((action: transActions.DeleteTransaction) => action.transId),
        switchMap((transId: string) => {
            return this.transService.Delete(transId)
                .pipe(
                    map((res: any) => { return new transActions.DeleteTransactionSuccess({ transId, message: res.message }); }),
                    catchError(err => { return of(new transActions.DeleteTransactionFailure(err)) })
                )
        })
    ));
}