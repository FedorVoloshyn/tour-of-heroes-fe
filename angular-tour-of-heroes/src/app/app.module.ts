import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BasicAuthInterceptor } from './core/interceptor/basic-auth.interceptor';

import { GlobalErrorHandler } from './core/error-handler/global-error-handler';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ConfigService } from './shared/config.service';

import { AccountModule } from './account/account.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { ProtectedComponentsModule } from './protected-componetns/protected-components.module';
import { SharedModule } from './shared/shared.module';
import { ShellModule } from './shell/shell.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent
  ],
  imports: [
    AccountModule,
    BrowserModule,
    CoreModule,
    HomeModule,
    FormsModule,
    HttpClientModule,
    ProtectedComponentsModule,
    SharedModule,
    ShellModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    ConfigService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
