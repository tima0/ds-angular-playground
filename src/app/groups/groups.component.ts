import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IGroup, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'cm-groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {

  title: string;
  filterText: string;
  groups: IGroup[] = [];
  filteredgroups: IGroup[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords = 0;
  pageSize = 10;

  constructor(private dataService: DataService,
    private filterService: FilterService,
    private logger: LoggerService) { }

  ngOnInit() {
    this.title = 'groups';
    this.filterText = 'Filter groups:';
    this.displayMode = DisplayModeEnum.Card;

    this.getgroupsPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getgroupsPage(page);
  }

  getgroupsPage(page: number) {
    this.dataService.getGroupsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IGroup[]>) => {
          this.groups = this.filteredgroups = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => this.logger.log(err),
        () => this.logger.log('getgroupsPage() retrieved groups for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.groups) {
        data = data.toUpperCase();
        const props = ['firstName', 'lastName', 'city', 'state.name'];
        this.filteredgroups = this.filterService.filter<IGroup>(this.groups, data, props);
    } else {
      this.filteredgroups = this.groups;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
