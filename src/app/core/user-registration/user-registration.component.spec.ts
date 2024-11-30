import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationComponent } from './user-registration.component';
import { UserService } from '../../shared/services/user.service';

describe('UserRegistrationComponent (with real backend)', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule], // Import HttpClientModule for real API requests
      providers: [
        UserService, // Use the actual UserService
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully register a user using real backend data', (done) => {
    component.registrationForm.setValue({
      first_name: 'John',
      last_name: 'Doe',
      email: 'b_nurmagambetov@kbtu.kz',
      password: 'password123'
    });

    component.submitRegistrationForm();

    setTimeout(() => {
      const sessionId = localStorage.getItem('session_id');
      expect(sessionId).not.toBeNull();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/confirmRegistration']);
      done();
    }, 3000); // Adjust the timeout to match backend response time
  });

  
});
