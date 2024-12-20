import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../shared/services/food.service'; // Adjust the path as needed
import { Food } from '../../shared/models/food.models';
import {NgIf} from "@angular/common";
import {CartService} from "../../shared/services/cart.service"; // Adjust the path as needed

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrls: ['./food-details.component.css']
})
export class FoodDetailsComponent implements OnInit {
  food!: Food;

  constructor(
    private route: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const food_id = String(routeParams.get('food_id'))
    this.foodService.getFoodDetails(food_id).subscribe((data: Food) => {
      this.food = data;
    })
  }

  addToCart(food: Food): void {
    this.cartService.addToCart(food).subscribe(
      response => console.log('Added to cart', response),
      error => console.error('Error adding to cart', error)
    );
  }
}
