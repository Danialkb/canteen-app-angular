import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FoodListComponent } from './food-list.component';
import { FoodService } from '../../shared/services/food.service';
import { CartService } from '../../shared/services/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Food } from '../../shared/models/food.models';

describe('FoodListComponent', () => {
  let component: FoodListComponent;
  let fixture: ComponentFixture<FoodListComponent>;
  let foodService: FoodService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FoodListComponent],
      providers: [FoodService, CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodListComponent);
    component = fixture.componentInstance;
    foodService = TestBed.inject(FoodService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch food list on initialization', () => {
    const mockFoodList: Food[] = []

    spyOn(foodService, 'getFoodList').and.returnValue(of(mockFoodList));

    component.ngOnInit();

    expect(foodService.getFoodList).toHaveBeenCalled();
    expect(component.foodList).not.toBeNull();
  });

  it('should search for food items', () => {
    const mockFoodList: Food[] = []

    spyOn(foodService, 'getFoodList').and.returnValue(of(mockFoodList));

    component.onSearch('Гречка');

    expect(foodService.getFoodList).toHaveBeenCalledWith({ search: 'Гречка' });
    expect(component.foodList).not.toBeNull();
  });

  
});
