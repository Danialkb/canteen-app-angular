import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserAuthComponent } from './user-auth.component';
import { UserService } from '../../shared/services/user.service';
import { of, throwError } from 'rxjs';

describe('UserAuthComponent', () => {
  let component: UserAuthComponent;
  let fixture: ComponentFixture<UserAuthComponent>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule],
      providers: [
        UserService,
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.createToken and navigate on successful login', (done) => {
  
    component.authenticationForm.setValue({
      email: 'nurmagambetovbakytzan@gmail.com',
      password: '12345'
    });
  
    component.submitAuthenticationForm();

    setTimeout(() => {
        const access_token = localStorage.getItem('access_token');
        expect(access_token).not.toBeNull();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
        done();
      }, 3000); 
  });
});

