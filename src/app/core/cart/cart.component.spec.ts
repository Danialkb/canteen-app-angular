import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../shared/services/cart.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CartComponent],
      providers: [CartService],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load orders on initialization', () => {
    const mockOrders = [{ id: 1, name: 'Pizza', amount: 2 }];
    spyOn(cartService, 'getCart').and.returnValue(of(mockOrders));

    component.ngOnInit();

    expect(cartService.getCart).toHaveBeenCalledWith('my_orders');
    expect(component.orders).toEqual(mockOrders);
  });

  it('should load orders on view option change', () => {
    const mockOrders = [{ id: 2, name: 'Burger', amount: 1 }];
    spyOn(cartService, 'getCart').and.returnValue(of(mockOrders));

    component.selectedOrdersViewOption = 'order_history';
    component.onOrdersViewOptionChange();

    expect(cartService.getCart).toHaveBeenCalledWith('order_history');
    expect(component.orders).toEqual(mockOrders);
  });

  it('should save changes to orders', () => {
    const mockOrders = [{ id: 1, name: 'Pizza', amount: 2 }];
    component.orders = mockOrders;
    component.specialWishes = { 1: 'Extra cheese' };

    const saveChangesSpy = spyOn(cartService, 'saveChanges').and.returnValue([of({ success: true })]);

    component.saveChanges();

    expect(saveChangesSpy).toHaveBeenCalledWith([{ ...mockOrders[0], special_wishes: 'Extra cheese' }]);
  });

  it('should submit the order', () => {
    spyOn(cartService, 'submitOrders').and.returnValue(of({ message: 'Order submitted' }));
    spyOn(console, 'log');

    component.submitOrder();

    expect(cartService.submitOrders).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Order submitted', { message: 'Order submitted' });
  });

  it('should handle error when submitting order', () => {
    spyOn(cartService, 'submitOrders').and.returnValue(throwError({ error: 'Submission failed' }));
    spyOn(console, 'error');

    component.submitOrder();

    expect(cartService.submitOrders).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error submitting order', { error: 'Submission failed' });
  });

  it('should delete an order', () => {
    const mockOrders = [{ id: 1, name: 'Pizza', amount: 2 }];
    component.orders = mockOrders;

    spyOn(cartService, 'deleteOrder').and.returnValue(of({}));

    component.deleteOrder(1);

    expect(cartService.deleteOrder).toHaveBeenCalledWith(1);
    expect(component.orders).toEqual([]);
  });

  it('should handle error when deleting an order', () => {
    spyOn(cartService, 'deleteOrder').and.returnValue(throwError({ error: 'Delete failed' }));
    spyOn(console, 'error');

    component.deleteOrder(1);

    expect(cartService.deleteOrder).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error deleting order:', { error: 'Delete failed' });
  });

  it('should change the quantity of an order', () => {
    const mockOrders = [{ id: 1, name: 'Pizza', amount: 2 }];
    component.orders = mockOrders;

    component.changeQuantity(1, 5);

    expect(component.orders[0].amount).toBe(5);
  });

  it('should navigate to food details', () => {
    spyOn(router, 'navigate');

    component.navigateToFood(1);

    expect(router.navigate).toHaveBeenCalledWith(['/food', 1]);
  });
});
