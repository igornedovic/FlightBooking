import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit, OnDestroy {
  title?: string;
  closeBtnName?: string;
  newUserForm: FormGroup;
  roles: string[] = ['Agent', 'Visitor'];
  private userSub: Subscription;


  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.newUserForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  onAddUser() {
    this.userSub = this.userService.addNewUser(this.newUserForm.value).subscribe((success) => {
      this.toastrService.success("Successfully added new user!")
      this.bsModalRef.hide();
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
