import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-user-confirm-registration',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './user-confirm-registration.component.html',
  styleUrls: ['./user-confirm-registration.component.css']
})
export class UserConfirmRegistrationComponent {
  confirmationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.confirmationForm = this.formBuilder.group({
      code: '',
      session_id: localStorage.getItem('session_id'),
    });
  }

  submitConfirmationForm() {
    this.userService.verifyRegistration(this.confirmationForm).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status !== 201) {
          console.log(error)
        }
      }
    )
  }
}
