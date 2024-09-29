import {Routes} from "@angular/router";
import {UserRegistrationComponent} from "./core/user-registration/user-registration.component";
import {UserAuthComponent} from "./core/user-auth/user-auth.component";
import {UserConfirmRegistrationComponent} from "./core/user-confirm-registration/user-confirm-registration.component";
import {FoodListComponent} from "./core/food-list/food-list.component";


export const routes: Routes = [
  {path: 'registration', component: UserRegistrationComponent},
  {path: 'login', component: UserAuthComponent},
  {path: 'confirmRegistration', component: UserConfirmRegistrationComponent},
  {path: 'menu', component: FoodListComponent},
  { path: '',   redirectTo: '/menu', pathMatch: 'full' },
]

