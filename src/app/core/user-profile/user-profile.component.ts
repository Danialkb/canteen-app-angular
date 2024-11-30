import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../shared/models/user.models";
import {UserService} from "../../shared/services/user.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: User | null = null;
  editedUser: User | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getProfileInfo().subscribe((user) => {
      this.user = user;
      this.editedUser = Object.assign({}, user);
    })
  }
  updateUser() {
    if (!this.editedUser) return;
    this.userService.updateUser(this.editedUser).subscribe((updatedUser: any) => {
      this.user = updatedUser;
      this.editedUser = updatedUser;
    })
  }
}
