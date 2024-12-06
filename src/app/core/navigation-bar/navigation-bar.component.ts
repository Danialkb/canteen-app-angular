import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FoodListComponent} from "../food-list/food-list.component";
import {NzIconModule, NzIconService} from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NzIconModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(UserOutline);
  }

  protected readonly FoodListComponent = FoodListComponent;
}
