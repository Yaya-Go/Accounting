import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TYPES } from 'src/app/config/enum';
import { AppState } from 'src/app/store/app.state';
import { AddTag, DeleteTag, UpdateTag } from 'src/app/store/tags';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() header: string;
  @Input() type: string;
  @Input() items: Observable<any[]>;
  
  selectId: string;
  newName: string;
  editName: string;

  isAddNew: boolean = false;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  save(item?: any) {
    switch (this.type) {
      case TYPES.TAG:        
        if (item && item.id) {
          const updatedItem = {
            ...item,
            name: this.newName
          };
          this.store.dispatch(new UpdateTag(updatedItem));
        } else {
          const newItem = { name: this.newName };
          this.store.dispatch(new AddTag(newItem));
        }
        this.cancel();
        break;
    }
  }

  cancel() {
    this.isAddNew = false;
    this.newName = '';
    this.editName = '';
    this.selectId = '';
  }
  
  edit(item: any) {
    this.editName = item.name;
    this.selectId = item.id;
  }

  delete(item: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        type: TYPES.TAG,
        item
      },
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (this.type) {
        case TYPES.TAG:
          this.store.dispatch(new DeleteTag(result.id));
          break;
      }      
    });
  }

}
