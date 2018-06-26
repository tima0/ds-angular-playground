import { RouterTestingModule } from '@angular/router/testing';
import { sandboxOf } from 'angular-playground';

import { SharedModule } from '../shared/shared.module';
import { GroupsComponent } from './groups.component';
import { GroupsCardComponent } from './groups-card.component';
import { GroupsGridComponent } from './groups-grid.component';
import { CoreModule } from '../core/core.module';
import { groups, MockDataService } from '../shared/mocks';
import { DataService } from '../core/services/data.service';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  declarations: [ GroupsCardComponent, GroupsGridComponent ],
  providers: [
    { provide: DataService, useClass: MockDataService }
],
  label: 'Groups Component'
};

export default sandboxOf(GroupsComponent, sandboxConfig)
  .add('With groups', {
    template: `<cm-groups></cm-groups>`
  });
