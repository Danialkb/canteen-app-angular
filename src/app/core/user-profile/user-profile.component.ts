import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from "../../shared/models/user.models";
import {UserService} from "../../shared/services/user.service";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";

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

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getProfileInfo().pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return of(null);
      })
    ).subscribe((user) => {
      if (user) {
        this.user = user;
        this.editedUser = Object.assign({}, user);
      }
    });
  }
  updateUser() {
    if (!this.editedUser) return;
    this.userService.updateUser(this.editedUser).subscribe((updatedUser: any) => {
      this.user = updatedUser;
      this.editedUser = updatedUser;
    })
  }
}
