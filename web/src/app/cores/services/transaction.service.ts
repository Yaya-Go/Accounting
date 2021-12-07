import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/config/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  Retrieve(transId: string) {
    return this.http.get(`${ this.API }/transaction/${ transId }`);
  }

  Create(trans: Transaction) {
    return this.http.post(`${ this.API }/transaction`, trans);
  }

  Update(transId: string, trans: Transaction) {
    return this.http.put(`${ this.API }/transaction/${ transId }`, trans);
  }

  Delete(transId: string) {
    return this.http.delete(`${ this.API }/transaction/${ transId }`);
  }

}
