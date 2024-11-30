import {Routes} from "@angular/router";
import {UserRegistrationComponent} from "./core/user-registration/user-registration.component";
import {UserAuthComponent} from "./core/user-auth/user-auth.component";
import {UserConfirmRegistrationComponent} from "./core/user-confirm-registration/user-confirm-registration.component";
import {FoodListComponent} from "./core/food-list/food-list.component";
import {CartComponent} from "./core/cart/cart.component";
import {FoodDetailsComponent} from "./core/food-details/food-details.component";
import {UserProfileComponent} from "./core/user-profile/user-profile.component";


export const routes: Routes = [
  {path: 'registration', component: UserRegistrationComponent},
  {path: 'login', component: UserAuthComponent},
  {path: 'confirmRegistration', component: UserConfirmRegistrationComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: 'food/:food_id', component: FoodDetailsComponent},
  {path: 'menu', component: FoodListComponent},
  {path: 'cart', component: CartComponent},
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
]

