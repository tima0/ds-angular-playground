import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GroupRoutingModule } from './group-routing.module';
import { GroupDetailsComponent } from './group-details.component';

@NgModule({
  imports: [GroupRoutingModule, SharedModule],
  declarations: [GroupRoutingModule.components]
})
export class GroupModule { }
