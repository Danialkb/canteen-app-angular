import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ConfirmationCode, TokenPair} from "../models/user.models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: String = 'http://localhost:8000/api/v1/users';

  constructor(private httpClient: HttpClient) {
  }

  applyForRegistration(userRegistrationForm: FormGroup): Observable<ConfirmationCode> {
    return this.httpClient.post<ConfirmationCode>(`${this.apiUrl}/`, userRegistrationForm.getRawValue());
  }

  verifyRegistration(registrationConfirmationForm: FormGroup) {
    return this.httpClient.post(`${this.apiUrl}/verify/`, registrationConfirmationForm.getRawValue());
  }

  createToken(authForm: FormGroup): Observable<TokenPair> {
    return this.httpClient.post<TokenPair>(`${this.apiUrl}/token/`, authForm.getRawValue());
  }

}
