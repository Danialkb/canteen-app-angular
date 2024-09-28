import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {

}
