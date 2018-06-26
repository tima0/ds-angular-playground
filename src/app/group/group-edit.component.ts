import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { IGroup, IState } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';
import { LoggerService } from '../core/services/logger.service';

@Component({
  selector: 'cm-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  group: IGroup =
    {
      id: 0,
      groupName: '',
      groupId: 0,
      status: '',
      subs: 0,
      effective: '',
      renewal: '',
      termDate: '',
      address: '',
      city: '',
      state: {
        abbreviation: '',
        name: ''
      }
    };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  @ViewChild('groupForm') groupForm: NgForm;
  getGroup: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService) { }

  ngOnInit() {
    // Subscribe to params so if it changes we pick it up. Don't technically need that here
    // since param won't be changing while component is alive.
    // Could use this.route.parent.snapshot.params["id"] to simplify it.
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getGroup(id);
      }
    });

    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  getgroup(id: number) {
    this.dataService.getGroup(id).subscribe((group: IGroup) => {
      this.group = group;
    });
  }

  submit() {
    if (this.group.id === 0) {
      this.dataService.insertGroup(this.group)
        .subscribe((insertedgroup: IGroup) => {
          if (insertedgroup) {
            // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
            this.groupForm.form.markAsPristine();
            this.router.navigate(['/groups']);
          } else {
            const msg = 'Unable to insert group';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    } else {
      this.dataService.updateGroup(this.group)
        .subscribe((status: boolean) => {
          if (status) {
            // Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
            this.groupForm.form.markAsPristine();
            this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
            // this.router.navigate(['/groups']);
          } else {
            const msg = 'Unable to update group';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    // Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/groups']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteGroup(this.group.id)
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/groups']);
        } else {
          this.errorMessage = 'Unable to delete group';
        }
      },
        (err) => this.logger.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.groupForm.dirty) {
      return true;
    }

    // Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  }

}
