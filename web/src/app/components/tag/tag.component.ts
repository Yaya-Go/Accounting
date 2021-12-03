import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TransactionComponent } from 'src/app/shared/transaction/transaction.component';
import { Get } from 'src/app/store/tags';
import { getCategory, getTag } from 'src/app/store/tags/tags.selectors';
import { Category } from '../../config/interfaces';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AppState } from '../../store/app.state';
import { Add, Delete, Fetch } from '../../store/category';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  tagId: string;
  list = this.store.select(getCategory);
  tag = this.store.select(getTag);

  new_name: string;
  isAddNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { 
    this.tagId = this.route.snapshot.params.tagId;
    // this.store.dispatch(new Fetch(this.tagId));
    this.store.dispatch(new Get(this.tagId));
  }

  saveCategory() {
    if (!this.new_name || !this.tagId) return;

    this.store.dispatch(new Add({ tagId: this.tagId, name: this.new_name }));

    this.cancelCategory();
  }

  cancelCategory() {
    this.new_name = '';
    this.isAddNew = false;
  }

  addNew() {
    this.new_name = '';
    this.isAddNew = true;
  }

  addTransaction(categoryId: string | undefined) {
    if (!categoryId) return;

    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '500px',
      data: {
        type: 'new',
        categoryId
      },
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        data: category,
        hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
        this.store.dispatch(new Delete(result.categoryId));
    });
  }

}
