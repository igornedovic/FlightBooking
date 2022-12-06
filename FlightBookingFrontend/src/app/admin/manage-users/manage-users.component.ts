import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  bsModalRef?: BsModalRef;
  agents: User[] = [];
  visitors: User[] = [];
  private agentSub: Subscription;
  private visitorSub: Subscription;

  constructor(private modalService: BsModalService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(() => {});

    this.agentSub = this.userService.agents.subscribe(agents => {
      this.agents = agents;
    })

    this.visitorSub = this.userService.visitors.subscribe(visitors => {
      this.visitors = visitors;
    })
  }
 
  openNewUserModal() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add new user',
        
      }
    };
    this.bsModalRef = this.modalService.show(NewUserComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.setClass('modal-lg');
  }

  ngOnDestroy() {
    if (this.agentSub) {
      this.agentSub.unsubscribe();
    }

    if (this.visitorSub) {
      this.visitorSub.unsubscribe();
    }
  }
}
