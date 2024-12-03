import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration.component';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, UserRegistrationComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the registration form', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.controls['first_name']).toBeTruthy();
    expect(component.registrationForm.controls['last_name']).toBeTruthy();
    expect(component.registrationForm.controls['email']).toBeTruthy();
    expect(component.registrationForm.controls['password']).toBeTruthy();
  });

  it('should validate password length', () => {
    const passwordControl = component.registrationForm.get('password');
    passwordControl?.setValue('12');
    expect(component.passwordLengthIsCorrect()).toBeFalse();

    passwordControl?.setValue('123');
    expect(component.passwordLengthIsCorrect()).toBeTrue();
  });

  it('should submit the registration form', () => {
    const mockResponse: { session_id: string; code: string } = {
      session_id: 'abc123',
      code: '123456'
    };
    spyOn(userService, 'applyForRegistration').and.returnValue(of(mockResponse));
    spyOn(router, 'navigate');
  
    component.registrationForm.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: '12345'
    });
  
    component.submitRegistrationForm();
  
    expect(userService.applyForRegistration).toHaveBeenCalledWith(component.registrationForm);
    expect(localStorage.getItem('session_id')).toBe('abc123');
    expect(router.navigate).toHaveBeenCalledWith(['/confirmRegistration']);
  });
  

  it('should handle errors during registration', () => {
    spyOn(userService, 'applyForRegistration').and.returnValue(throwError({ status: 400 }));
    spyOn(console, 'log');

    component.registrationForm.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: '12345'
    });

    component.submitRegistrationForm();

    expect(userService.applyForRegistration).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith({ status: 400 });
  });
});
