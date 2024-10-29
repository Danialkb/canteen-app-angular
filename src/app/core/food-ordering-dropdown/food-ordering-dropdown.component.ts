import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-food-ordering-dropdown',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  templateUrl: './food-ordering-dropdown.component.html',
  styleUrls: ['./food-ordering-dropdown.component.css']
})
export class FoodOrderingDropdownComponent {
  orderOptions = [
    { label: '', value: '' },
    { label: 'Цена ↑', value: 'price' },
    { label: 'Цена ↓', value: '-price' },
    { label: 'А-Я', value: 'name' },
    { label: 'Я-А', value: '-name' }
  ];

  selectedOption: string = '';

  @Output() orderEvent: EventEmitter<string> = new EventEmitter<string>();

  orderFoodList() {
    if(!this.selectedOption)
      return
    this.orderEvent.emit(this.selectedOption);
  }
}
