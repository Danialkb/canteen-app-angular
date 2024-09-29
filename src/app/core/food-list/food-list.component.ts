import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Food} from "../../shared/models/food.models";
import {FoodService} from "../../shared/services/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  foodList: Food[] = [];

  constructor(
    private foodService: FoodService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.foodService.getFoodList().subscribe(
      response => {
        this.foodList = response;
      }
    )
  }
}
