import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IGroup } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  selector: 'cm-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {

  group: IGroup;
  mapEnabled: boolean;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.dataService.getGroup(id)
          .subscribe((group: IGroup) => {
            this.group = group;
            this.mapEnabled = true;
          });
      }
    });
  }


}
