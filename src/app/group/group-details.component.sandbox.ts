import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { DataService } from '../core/services/data.service';
import { GroupDetailsComponent } from './group-details.component';
import { MockDataService, MockActivatedRoute, getActivatedRouteWithParent } from '../shared/mocks';
import { ActivatedRoute } from '@angular/router';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule ],
  providers: [
      { provide: DataService, useClass: MockDataService },
      { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id: '1' }]);
        return route;
      }}
  ],
  label: 'Group Details Component'
};

export default sandboxOf(GroupDetailsComponent, sandboxConfig)
  .add('With a group', {
    template: `<cm-group-details></cm-group-details>`
  })
  .add('Without a group', {
    template: `<cm-group-details></cm-group-details>`,
    providers: [
      { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id: null }]);
        return route;
      }}
    ]
  });
