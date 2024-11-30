import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserConfirmRegistrationComponent } from './user-confirm-registration.component';
import { UserService } from '../../shared/services/user.service';
import { of, throwError } from 'rxjs';

describe('UserConfirmRegistrationComponent', () => {
  let component: UserConfirmRegistrationComponent;
  let fixture: ComponentFixture<UserConfirmRegistrationComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj('UserService', ['verifyRegistration']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserConfirmRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // Ensure `localStorage` is cleared between tests
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with code and session_id fields', () => {
    const form = component.confirmationForm;
    expect(form).toBeTruthy();
    expect(form.controls['code']).toBeTruthy();
    expect(form.controls['session_id']).toBeTruthy();
  });

  it('should call UserService.verifyRegistration and navigate on successful verification', () => {
    userServiceMock.verifyRegistration.and.returnValue(of({ message: 'Success' }));

    component.confirmationForm.setValue({ code: '123456', session_id: 'mock-session-id' });
    component.submitConfirmationForm();

    expect(userServiceMock.verifyRegistration).toHaveBeenCalledWith(component.confirmationForm);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle API errors gracefully', () => {
    const mockError = { status: 400, message: 'Invalid code' };
    userServiceMock.verifyRegistration.and.returnValue(throwError(() => mockError));

    spyOn(console, 'log');

    component.confirmationForm.setValue({ code: 'wrongcode', session_id: 'mock-session-id' });
    component.submitConfirmationForm();

    expect(userServiceMock.verifyRegistration).toHaveBeenCalledWith(component.confirmationForm);
    expect(console.log).toHaveBeenCalledWith(mockError);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
