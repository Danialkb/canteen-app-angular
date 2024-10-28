import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Food} from "../../shared/models/food.models";
import {FoodService} from "../../shared/services/food.service";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {CartService} from "../../shared/services/cart.service";
import {FoodSearchBarComponent} from "../food-search-bar/food-search-bar.component";

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FoodSearchBarComponent],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  foodList: Food[] = [];

  constructor(
    private foodService: FoodService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getFoodList();
  }

  getFoodList(foodSearchName: string = '') {
    const queryParams = foodSearchName ? { search: foodSearchName } : null;
    this.foodService.getFoodList(queryParams).subscribe(
      response => {
        this.foodList = response;
      }
    )
  }

  addToCart(food: Food): void {
    this.cartService.addToCart(food).subscribe(
      response => console.log('Added to cart', response),
        error => console.error('Error adding to cart', error)
    );
  }
}
