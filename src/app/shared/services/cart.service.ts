import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Food} from "../models/food.models";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Food[] = [];
  private endpoint: string = "http://localhost:8000/api/v1/order";

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.endpoint}`+ '/my_orders/');
  }

  addToCart(food: Food): Observable<any> {
    const payload = {
      food: food.id,
      amount: 1,
      special_wishes: ""
    };
    return this.http.post(this.endpoint + "/", payload);
  }

  saveChanges(orders: any[]): Observable<Object>[] {
    return orders.map(order =>
      this.http.put(`${this.endpoint}/${order.id}/`, order)
    );
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/${orderId}`);
  }

  submitOrders(): Observable<any> {
    return this.http.get(`${this.endpoint}/send_user_orders/`);
  }
}
