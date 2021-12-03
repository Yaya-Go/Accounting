import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Transaction } from 'src/app/config/interfaces';
import { AppState } from 'src/app/store/app.state';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class TransactionComponent {

  header: string;
  categoryId: string;
  type: string;

  form: FormGroup = new FormGroup({
    name: new FormControl(['']),
    desc: new FormControl(['']),
    transDate: new FormControl(['']),
    total: new FormControl(['']),
    subtotal: new FormControl(['']),
    tax: new FormControl(['']),
    date: new FormControl([''])
  });

  constructor(
    public dialogRef: MatDialogRef<TransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { 
    this.categoryId = data.categoryId;
    this.type = data.type;
    this.header = data.type === 'new' ? 'Add new transaction' : 'Edit Transaction';
    this.form = this.fb.group({
      name: [data.type === 'new' ? '' : data.category.name, Validators.required],
      desc: [data.type === 'new' ? '' : data.category.desc],
      transDate: [data.type === 'new' ? '' : data.category.transDate],
      total: [data.type === 'new' ? '' : data.category.total],
      subtotal: [data.type === 'new' ? '' : data.category.subtotal],
      tax: [data.type === 'new' ? '' : data.category.tax],
      date: [data.type === 'new' ? new Date() : new Date(data.category.transDate)]
    });
  }

  save() {
    if (this.form.invalid) return;
    const transaction: Transaction = this.form.value;
    if (this.type === 'new') {
      transaction.categoryId = this.categoryId;
    }
    transaction.transDate = (this.form.get('date')?.value as Date).toISOString();    

    this.dialogRef.close(transaction);
  }

  cancel() {
    this.dialogRef.close();
  }

}
