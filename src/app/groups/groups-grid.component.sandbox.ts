import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { GroupsGridComponent } from './groups-grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core/core.module';
import { groups } from '../shared/mocks';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  label: 'groups Grid Component'
};

export default sandboxOf(GroupsGridComponent, sandboxConfig)
  .add('With Many groups', {
    template: `<cm-groups-grid [groups]="groups"></cm-groups-grid>`,
    context: {
      groups: groups
    }
  })
  .add('With 10 groups', {
    template: `<cm-groups-grid [groups]="groups"></cm-groups-grid>`,
    context: {
      groups: groups.slice(0, 10)
    }
  })
  .add('With 4 groups', {
    template: `<cm-groups-grid [groups]="groups"></cm-groups-grid>`,
    context: {
      groups: groups.slice(0, 4)
    }
  })
  .add('Without groups', {
    template: `<cm-groups-grid></cm-groups-grid>`
  });

