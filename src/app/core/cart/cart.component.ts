import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {CartService} from "../../shared/services/cart.service";
import {FormsModule} from "@angular/forms";
import {Food} from "../../shared/models/food.models";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: any[] = [];
  specialWishes: { [key: number]: string } = {};

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data: any[]) => {
      this.orders = data;
    });
  }

  saveChanges(): void {
    const updatedOrders = this.orders.map(order => ({
      ...order,
      special_wishes: this.specialWishes[order.id] || ''
    }));
    this.cartService.saveChanges(updatedOrders).forEach((request, index) => {
      request.subscribe(
        response => console.log('Updated order', response),
        error => console.error('Error updating order', error)
      );
    });
  }

  submitOrder(): void {
    this.cartService.submitOrders().subscribe(
      response => console.log('Order submitted', response),
      error => console.error('Error submitting order', error)
    );

  }

  deleteOrder(orderId: number): void {
    this.cartService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== orderId);
    }, error => {
      console.error('Error deleting order:', error);
    });
  }


  changeQuantity(orderId: number, newQuantity: number): void {
    this.orders = this.orders.map(order =>
      order.id === orderId ? {...order, amount: newQuantity} : order
    );
  }

  navigateToFood(foodID: number) {
    this.router.navigate(['/food', foodID])
  }

}
