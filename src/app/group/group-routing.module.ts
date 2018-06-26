import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupComponent } from './group.component';
import { GroupDetailsComponent } from './group-details.component';
import { GroupEditComponent } from './group-edit.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      {
        path: 'edit',
        component: GroupEditComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard, CanDeactivateGuard]
})
export class GroupRoutingModule {
  static components = [GroupComponent, GroupDetailsComponent, GroupEditComponent];
}

