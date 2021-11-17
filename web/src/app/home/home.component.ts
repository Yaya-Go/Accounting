import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Tag } from '../config/interfaces';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { AppState } from '../store/app.state';
import { Add, Delete, Fetch, Update } from '../store/tags';
import { getTags } from '../store/tags/tags.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  new_tag_name: string;
  isAddNew: boolean = false;

  tags = this.store.select(getTags);

  selectedTagId: string | undefined;
  edit_new_name: string;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { 
    this.store.dispatch(new Fetch());
  }

  ngOnInit(): void {
  }

  addNewTag(): void {
    this.new_tag_name = '';
    this.isAddNew = true;
  }

  saveNewTag(): void {
    let newTag = { name: this.new_tag_name };

    this.store.dispatch(new Add(newTag));

    this.cancelNewTag();
  }

  cancelNewTag(): void {
    this.new_tag_name = '';
    this.isAddNew = false;
  }

  deleteTag(tag: Tag) {
    const dialogRef = this.dialog.open(DialogComponent, {
        width: '500px',
        data: tag,
        hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
        this.store.dispatch(new Delete(result.tagId));
    });
  }

  editTag(tag: Tag) {
    this.edit_new_name = tag.name;
    this.selectedTagId = tag.tagId;
  }

  cancelEdit() {
    this.selectedTagId = '';
    this.edit_new_name = '';
  }

  saveTag() {
    if (!this.edit_new_name || !this.selectedTagId) return;
    this.store.dispatch(new Update({ tagId: this.selectedTagId, name: this.edit_new_name }));
    this.cancelEdit();
  }

}
