import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from '../config/interfaces';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { AppState } from '../store/app.state';
import { Add, Delete, Fetch } from '../store/category';
import { getList } from '../store/category/category.selectors';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tagId: string;
  list = this.store.select(getList);

  new_name: string;
  isAddNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { 
    this.tagId = this.route.snapshot.params.tagId;
    this.store.dispatch(new Fetch(this.tagId));
  }

  ngOnInit(): void {
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

  editCategory(category: Category) {}

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
