import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TagComponent } from '../components/tag/tag.component';
import { CategoryComponent } from '../components/category/category.component';

@NgModule({
  declarations: [
    HomeComponent,
    TagComponent,
    CategoryComponent
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
