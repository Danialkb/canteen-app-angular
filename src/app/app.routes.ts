import {Routes} from "@angular/router";
import {UserRegistrationComponent} from "./core/user-registration/user-registration.component";
import {UserAuthComponent} from "./core/user-auth/user-auth.component";
import {UserConfirmRegistrationComponent} from "./core/user-confirm-registration/user-confirm-registration.component";


export const routes: Routes = [
  {path: 'registration', component: UserRegistrationComponent},
  {path: 'login', component: UserAuthComponent},
  {path: 'confirmRegistration', component: UserConfirmRegistrationComponent},
]

