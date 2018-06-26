import { sandboxOf } from 'angular-playground';
import { SharedModule } from '../shared/shared.module';
import { GroupsCardComponent } from './groups-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '../core/core.module';
import { groups } from '../shared/mocks';

const sandboxConfig = {
  imports: [ SharedModule, CoreModule, RouterTestingModule ],
  label: 'groups Card Component'
};

export default sandboxOf(GroupsCardComponent, sandboxConfig)
  .add('With Many groups', {
    template: `<cm-groups-card [groups]="groups"></cm-groups-card>`,
    context: {
      groups: groups
    }
  })
  .add('With 10 groups', {
    template: `<cm-groups-card [groups]="groups"></cm-groups-card>`,
    context: {
      groups: groups.slice(0, 10)
    }
  })
  .add('With 4 groups', {
    template: `<cm-groups-card [groups]="groups"></cm-groups-card>`,
    context: {
      groups: groups.slice(0, 4)
    }
  })
  .add('Without groups', {
    template: `<cm-groups-card></cm-groups-card>`
  });

