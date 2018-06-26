import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IGroup } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
  selector: 'cm-groups-card',
  templateUrl: './groups-card.component.html',
  styleUrls: [ './groups-card.component.css' ],
  // When using OnPush detectors, then the framework will check an OnPush
  // component when any of its input properties changes, when it fires
  // an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsCardComponent implements OnInit {

  @Input() groups: IGroup[] = [];

  constructor(public trackbyService: TrackByService) { }

  ngOnInit() {

  }

}

