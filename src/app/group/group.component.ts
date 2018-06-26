import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

    // displayMode: groupDisplayModeEnum;
    // displayModeEnum = groupDisplayModeEnum;

    constructor(private router: Router) { }

    ngOnInit() {

      // No longer needed due to routerLinkActive feature in Angular
      // const path = this.router.url.split('/')[3];
      // switch (path) {
      //   case 'details':
      //     this.displayMode = groupDisplayModeEnum.Details;
      //     break;
      //   case 'orders':
      //     this.displayMode = groupDisplayModeEnum.Orders;
      //     break;
      //   case 'edit':
      //     this.displayMode = groupDisplayModeEnum.Edit;
      //     break;
      // }
    }

}

// enum groupDisplayModeEnum {
//   Details=0,
//   Orders=1,
//   Edit=2
// }
