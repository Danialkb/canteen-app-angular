import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  authenticationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.authenticationForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submitAuthenticationForm() {
    this.userService.createToken(this.authenticationForm).subscribe(
      response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        this.router.navigate(['/']);
      },
      error => {  
        if (error.status !== 201) {
          console.log(error)
        }
      }
    )
  }
}
