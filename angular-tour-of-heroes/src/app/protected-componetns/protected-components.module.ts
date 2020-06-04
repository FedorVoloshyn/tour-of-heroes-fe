import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

import { ProtectedComponentsRoutingModule } from './protected-components.routing-module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  providers: [
    HeroService,
    MessageService
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProtectedComponentsRoutingModule
  ]
})
export class ProtectedComponentsModule { }
