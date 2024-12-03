import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserConfirmRegistrationComponent } from './user-confirm-registration.component';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserConfirmRegistrationComponent', () => {
  let component: UserConfirmRegistrationComponent;
  let fixture: ComponentFixture<UserConfirmRegistrationComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, UserConfirmRegistrationComponent],
      providers: [UserService, FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(UserConfirmRegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the confirmation form with session_id from localStorage', () => {
    const mockSessionId = 'abc123';
    spyOn(localStorage, 'getItem').and.returnValue(mockSessionId);


    expect(component.confirmationForm.value.session_id).toEqual(mockSessionId);
  });

  it('should call verifyRegistration on form submission', () => {
    spyOn(userService, 'verifyRegistration').and.returnValue(of({ message: 'Success' }));
    spyOn(router, 'navigate');

    component.confirmationForm.setValue({
      code: '123456',
      session_id: 'abc123',
    });

    component.submitConfirmationForm();

    expect(userService.verifyRegistration).toHaveBeenCalledWith(component.confirmationForm);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle errors during form submission', () => {
    spyOn(userService, 'verifyRegistration').and.returnValue(
      throwError({ status: 400, error: 'Invalid code' })
    );
    spyOn(console, 'log');

    component.confirmationForm.setValue({
      code: '123456',
      session_id: 'mock-session-id',
    });

    component.submitConfirmationForm();

    expect(userService.verifyRegistration).toHaveBeenCalledWith(component.confirmationForm);
    expect(console.log).toHaveBeenCalledWith({ status: 400, error: 'Invalid code' });
  });

  it('should not log errors if the status is 201 during form submission', () => {
    spyOn(userService, 'verifyRegistration').and.returnValue(
      throwError({ status: 201, error: 'Already confirmed' })
    );
    spyOn(console, 'log');

    component.confirmationForm.setValue({
      code: '123456',
      session_id: 'mock-session-id',
    });

    component.submitConfirmationForm();

    expect(userService.verifyRegistration).toHaveBeenCalledWith(component.confirmationForm);
    expect(console.log).not.toHaveBeenCalled();
  });
});
