import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../tag/tag.component';

@NgModule({
  declarations: [
    HomeComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    TranslateModule,
    SharedModule
  ]
})
export class HomeModule { }
