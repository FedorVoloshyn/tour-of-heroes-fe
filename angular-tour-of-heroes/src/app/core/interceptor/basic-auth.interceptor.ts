import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../authentication/auth.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private readonly authenticationService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    return from(this.authenticationService.getAuthorizationHeaderValue()).pipe(
      switchMap(
        token => {
          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: token
              }
            });

            return next.handle(request)
              .pipe(
                tap((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                  }
                }, (err: any) => {
                  if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                      location.reload();
                    }
                  }
                })
              );
          }
        }
      )
    );


  }
}
