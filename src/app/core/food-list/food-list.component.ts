import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Food} from "../../shared/models/food.models";
import {FoodService} from "../../shared/services/food.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CartService} from "../../shared/services/cart.service";
import {FoodSearchBarComponent} from "../food-search-bar/food-search-bar.component";
import {FoodOrderingDropdownComponent} from "../food-ordering-dropdown/food-ordering-dropdown.component";


@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FoodSearchBarComponent, FoodOrderingDropdownComponent],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  foodList: Food[] = [];
  foodSearchName: string = '';
  ordering: string = '';

  constructor(
    private foodService: FoodService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getFoodList();
  }

  getFoodList() {
    let queryParams: any = {}

    if(this.foodSearchName) {
      queryParams['search'] = this.foodSearchName;
    }

    if(this.ordering) {
      queryParams['ordering'] = this.ordering;
    }

    this.foodService.getFoodList(queryParams).subscribe(
      response => {
        this.foodList = response;
      }
    )
  }

  onSearch(foodSearchName: string) {
    this.foodSearchName = foodSearchName;
    this.getFoodList();
  }

  onOrder(ordering: string) {
    this.ordering = ordering;
    this.getFoodList();
  }

  addToCart(food: Food): void {
    this.cartService.addToCart(food).subscribe(
      response => console.log('Added to cart', response),
        error => console.error('Error adding to cart', error)
    );
  }
}
