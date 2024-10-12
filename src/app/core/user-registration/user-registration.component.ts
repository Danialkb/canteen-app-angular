import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterOutlet} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.registrationForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    });
  }

  passwordLengthIsCorrect() {
    let password = this.registrationForm.get('password');
    return password?.value.length >= 3;
  }

  submitRegistrationForm() {
    this.userService.applyForRegistration(this.registrationForm).subscribe(
      response => {
        localStorage.setItem('session_id', response.session_id);
        this.router.navigate(['/confirmRegistration']);
      },
      error => {
        if (error.status !== 201) {
          console.log(error)
        }
      }
    )
  }
}
