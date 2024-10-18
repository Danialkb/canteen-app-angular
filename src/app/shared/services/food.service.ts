import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Food} from "../models/food.models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl: String = 'http://localhost:8000/api/v1/food';

  constructor(private httpClient: HttpClient) {
  }

  getFoodList(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(`${this.apiUrl}`);
  }

  getFoodDetails(id: string): Observable<Food> {
    return this.httpClient.get<Food>(`${this.apiUrl}/${id}`);
  }

}
