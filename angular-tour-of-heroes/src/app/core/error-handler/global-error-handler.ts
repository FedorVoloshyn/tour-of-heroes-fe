import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private readonly injector: Injector
    ) { }

    handleError(error: Error | HttpErrorResponse): void {
        let message = '';
        let title = '';

        if (error instanceof HttpErrorResponse) {
            if (!error.error) {
                message = error.message;
            } else {
                // tslint:disable-next-line: forin
                for (const key in error.error) {
                    const value = error.error[key];
                    if (Array.isArray(value)) {
                        value.forEach(err => {
                            message += err + ' ';
                        });
                    } else {
                        message += value + ' ';
                    }
                }
            }

            title = 'Send request exception';
        } else {
            if (!navigator.onLine) {
                message = 'No Internet Connection';
            } else {
                message = error.message ? error.message : error.toString();
            }

            title = 'Unhandled application exception';
        }

        const numerableError = JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));

        console.error(message, title);
    }
}
