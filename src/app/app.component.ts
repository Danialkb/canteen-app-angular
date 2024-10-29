import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UserRegistrationComponent} from "./core/user-registration/user-registration.component";
import {NavigationBarComponent} from "./core/navigation-bar/navigation-bar.component";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, UserRegistrationComponent, NavigationBarComponent, FormsModule, NzSelectModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
