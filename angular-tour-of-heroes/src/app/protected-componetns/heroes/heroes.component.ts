import { Component, OnInit } from '@angular/core';
import { Hero } from '../../shared/models/hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { AuthService } from '../../core/authentication/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { stringify } from 'querystring';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  busy: boolean;

  constructor(private heroService: HeroService,
              private authService: AuthService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.busy = true;
    this.spinner.show();
    this.getHeroes(this.authService.authorizationHeaderValue);
  }

  getHeroes(token: string): void {
    this.heroService.getHeroes(token)
    .pipe(finalize(() => {
      this.spinner.hide();
      this.busy = false;
    })).subscribe(heroes => this.heroes = heroes);
  }

}
