import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './groups.component';
import { GroupsCardComponent } from './groups-card.component';
import { GroupsGridComponent } from './groups-grid.component';

const routes: Routes = [
  { path: '', component: GroupsComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class GroupsRoutingModule {
  static components = [ GroupsComponent, GroupsCardComponent, GroupsGridComponent ];
}
