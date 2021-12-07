import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TransactionComponent } from 'src/app/shared/transaction/transaction.component';
import { GetTag } from 'src/app/store/tags';
import { getCategory, getTag, getTags } from 'src/app/store/tags/tags.selectors';
import { Category } from '../../config/interfaces';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { AppState } from '../../store/app.state';
import { AddCategory, DeleteCategory } from '../../store/category';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  tags = this.store.select(getTags);
  tagId: string;
  list = this.store.select(getCategory);
  tag = this.store.select(getTag);

  newName: string;
  isAddNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { 
    this.tagId = this.route.snapshot.params.tagId;
    if (this.tagId) {
      this.store.dispatch(new GetTag(this.tagId));
    }
  }

  saveCategory() {
    if (!this.newName || !this.tagId) return;

    this.store.dispatch(new AddCategory({ tagId: this.tagId, name: this.newName }));

    this.cancelCategory();
  }

  cancelCategory() {
    this.newName = '';
    this.isAddNew = false;
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
        this.store.dispatch(new DeleteCategory(result.id));
    });
  }

}
