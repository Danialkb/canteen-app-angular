import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

}
