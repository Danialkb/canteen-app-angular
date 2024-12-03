import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../../shared/services/user.service';
import { of } from 'rxjs';
import { User } from '../../shared/models/user.models';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UserProfileComponent],
      providers: [UserService]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update user profile', () => {
    const initialUser: User = { id: 1, first_name: 'Bakytzhan',last_name:'Nurmagambetov', email: 'nurmagambetovbakytzan@gmail.com' };
    const updatedUser: User = { id: 1, first_name: 'NEWBAKYTZHAN',last_name:'Nurmagambetov', email: 'nurmagambetovbakytzan@gmail.com' };

    spyOn(userService, 'getProfileInfo').and.returnValue(of(initialUser));
    spyOn(userService, 'updateUser').and.returnValue(of(updatedUser));

    component.ngOnInit();
    component.editedUser!.first_name = 'NEWBAKYTZHAN';
    component.updateUser();

    expect(userService.updateUser).toHaveBeenCalledWith({
      id: 1,
      first_name: 'NEWBAKYTZHAN',
      last_name:"Nurmagambetov",
      email:"nurmagambetovbakytzan@gmail.com"
    });
    expect(component.user).toEqual(updatedUser);
    expect(component.editedUser).toEqual(updatedUser);
  });

  it('should not update if editedUser is null', () => {
    spyOn(userService, 'updateUser');

    component.editedUser = null;
    component.updateUser();

    expect(userService.updateUser).not.toHaveBeenCalled();
  });
});
