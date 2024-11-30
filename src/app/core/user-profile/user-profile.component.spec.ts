import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../../shared/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from '../../shared/models/user.models';
import { FormsModule } from '@angular/forms';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // Create a mock UserService and spy on the getProfileInfo and updateUser methods
    userServiceMock = jasmine.createSpyObj('UserService', ['getProfileInfo', 'updateUser']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule,UserProfileComponent],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('#loadUser', () => {
    it('should load user profile info and populate user and editedUser', () => {
      const mockUser: User = { id: 1, first_name: 'Бакытжан',last_name: "Нурмагамбетов", email: 'nurmagambetovbakytzan@gmail.com' };
      // Return an Observable from the mock method
      userServiceMock.getProfileInfo.and.returnValue(of(mockUser));

      component.loadUser();

      expect(userServiceMock.getProfileInfo).toHaveBeenCalled();
      expect(component.user).toEqual(mockUser);
      expect(component.editedUser).toEqual(mockUser);
    });
  });

  describe('#updateUser', () => {
    it('should update the user info with the editedUser data', () => {
      const mockUpdatedUser: User = { id: 1, first_name: 'Новый',last_name: "НОВЫЙ", email: 'nurmagambetovbakytzan@gmail.com' };
      component.editedUser ={ id: 1, first_name: 'Новый',last_name: "НОВЫЙ", email: 'nurmagambetovbakytzan@gmail.com' };
      // Return an Observable from the mock method
      userServiceMock.updateUser.and.returnValue(of(mockUpdatedUser));

      component.updateUser();

      expect(userServiceMock.updateUser).toHaveBeenCalledWith(component.editedUser);
      expect(component.user).toEqual(mockUpdatedUser);
      expect(component.editedUser).toEqual(mockUpdatedUser);
    });

    it('should do nothing if editedUser is null', () => {
      component.editedUser = null;

      component.updateUser();

      expect(userServiceMock.updateUser).not.toHaveBeenCalled();
    });
  });
});
