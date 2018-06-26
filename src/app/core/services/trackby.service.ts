import { Injectable } from '@angular/core';

import { IGroup } from '../../shared/interfaces';

@Injectable()
export class TrackByService {

  group(index: number, group: IGroup) {
    return group.id;
  }

}
