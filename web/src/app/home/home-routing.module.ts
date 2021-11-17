import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from '../tag/tag.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'tag/:tagId',
                component: TagComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
