import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [GroupsRoutingModule, SharedModule],
  declarations: [GroupsRoutingModule.components]
})
export class GroupsModule { }
