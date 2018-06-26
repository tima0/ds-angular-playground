import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { GroupEditComponent } from './group-edit.component';
import { LoggerService } from '../core/services/logger.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<GroupEditComponent> {

  constructor(private logger: LoggerService) {}

  canDeactivate(
    component: GroupEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.logger.log(`groupId: ${route.parent.params['id']} URL: ${state.url}`);

    // Check with component to see if we're able to deactivate
    return component.canDeactivate();
  }
}
