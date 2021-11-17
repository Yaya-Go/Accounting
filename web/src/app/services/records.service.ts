import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transaction } from '../config/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  getSummary() {
    return this.http.get(`${ this.API }/tags/summary`);
  }

  getSummaryByTag(tagId: string) {
    return this.http.get(`${ this.API }/tags/${ tagId }/summary`);
  }

  getTransactions(tagId: string) {
    return this.http.get(`${ this.API }/tags/${ tagId }/transactions`)
  }

  createTransaction(tagId: string, record: Transaction) {
    return this.http.post(`${ this.API }/tags/${ tagId }/transaction`, record);
  }

  updateTransaction() {}

  deleteTransaction() {}
}
