import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FoodService} from "../../shared/services/food.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-food-search-bar',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzButtonModule, NzIconModule, FormsModule],
  templateUrl: './food-search-bar.component.html',
  styleUrls: ['./food-search-bar.component.css']
})
export class FoodSearchBarComponent {
  foodSearchName: string = '';
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private foodService: FoodService,
    private router: Router,
  ) {}

  searchFoodByName() {
    this.searchEvent.emit(this.foodSearchName);
  }

}
