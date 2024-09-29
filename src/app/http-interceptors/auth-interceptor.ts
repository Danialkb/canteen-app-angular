import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenPrefix = 'Bearer';
  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = localStorage.getItem('access_token');

    console.log('Token from local storage:', accessToken);

    if (!accessToken) {
      return next.handle(request);
    }

    const authorizedRequest = request.clone({
      headers: request.headers.set('Authorization', `${this.tokenPrefix} ${accessToken}`)
    });

    return next.handle(authorizedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
        return throwError(error);
      })
    );
  }
}
